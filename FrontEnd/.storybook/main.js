const path = require('path');

module.exports = {
  'stories': ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  'addons': [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    // Handle SCSS modules
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: true,
        },
        sassLoaderOptions: {
          sassOptions: {
            // include the path to the scss folder for easy access (it allows you to do things like
            // "@import 'utils'" without having to specify the path)
            includePaths: [path.join(__dirname, '../src/assets/scss')],
          },
          // Prepend the following line to every scss file (no need to import to use sass
          // variables and other utils in every file)
          additionalData: `@use 'utils' as *;`,
        },
      },
    },
  ],
  webpackFinal: async (config) => {
    // Needed for SVG importing using svgr
    // find index of the rule to handle SVG's
    const indexOfRuleToRemove = config.module.rules.findIndex(
      (rule) => rule.test && rule.test.toString().includes('svg')
    );

    // replace that rule with a rule to load other files (use 'file-loader' package to do so)
    config.module.rules.splice(indexOfRuleToRemove, 1, {
      test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
      loader: require.resolve('file-loader'),
      options: {
        name: 'static/media/[name].[hash:8].[ext]',
        esModule: false,
      },
    })

    // add a new rule to handle SVG files with '@svgr/webpack' package
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: false,
          },
        },
      ],
    })

    // Merge your next webpack config with this config
    const nextConfig = require('../next.config.js');
    return { ...nextConfig.webpack, ...config };
  },
};