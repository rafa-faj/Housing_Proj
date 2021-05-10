const withImages = require('next-images')
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['homehub-images-upload']);

module.exports = withPlugins([
  withTM,
  [
    withImages,
    {
      fileExtensions: ["jpg", "jpeg", "png", "gif", "ico", "webp", "jp2", "avif"],
    }
  ]
],
{
  sassOptions: {
    includePaths: ['./src/assets/scss'], // TODO use the path module?
    prependData: `@use 'utils' as *;`
  },
  webpack: (config, options) => {
    // TODO this is unnecessary I think since we don't use sentry
    if (!options.isServer) {
      config.resolve.alias["@sentry/node"] = "@sentry/browser";
    }
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config;
  }
});