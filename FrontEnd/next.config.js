const toPath = require('./toPath').toPath;

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins');
// transpile homehub images upload package's css
const withTM = require('next-transpile-modules')(['homehub-images-upload']);

module.exports = withPlugins([
  withTM,
  // Consume image files (listed in fileExtensions) using next-images package
  [
    withImages,
    {
      fileExtensions: ['jpg', 'jpeg', 'png', 'gif', 'ico', 'webp', 'jp2', 'avif'],
    }
  ]
],
{
  sassOptions: {
    // include the path to the scss folder for easy access (it allows you to do things like
    // "@import 'utils'" without having to specify the path)
    includePaths: [toPath('src/assets/scss')],
    // Prepend the following line to every scss file (no need to import to use sass
    // variables and other utils in every file)
    prependData: `@use 'utils' as *;`
  },
  webpack: (config, options) => {
    // Consume SVG files for webpack
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    // TODO not sure if this is needed yet
    // Use aliases (aka paths) in tsconfig.json to set the aliases in webpack as
    // well (do this using tsconfig-paths-webpack-plugin package)
    // config.resolve.plugins = config.resolve.plugins || [];
    // config.resolve.plugins.push(
    //   new TsconfigPathsPlugin({
    //     configFile: toPath('tsconfig.json'),
    //   })
    // );
    // config.resolve.extensions.push('.ts', '.tsx');

    return config;
  }
});