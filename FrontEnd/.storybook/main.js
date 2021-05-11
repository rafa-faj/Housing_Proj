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
          implementation: require("sass"),
          sassOptions: {
            includePaths: [path.join(__dirname, '../src/assets/scss')],
          },
          additionalData: `@use 'utils' as *;`,
        },
      },
    },
  ]
}