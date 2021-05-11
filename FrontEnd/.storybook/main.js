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
  ]
}