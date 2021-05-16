/**
 * This file is a config file for jest-css-modules-transform, which is used in
 * jest to handle style files. https://www.npmjs.com/package/jest-css-modules-transform
 */
const toPath = require('./toPath').toPath;

module.exports = {
  prepend: [
    // Doesn't support `@use` prepend yet, so need to prepend
    // util files individually
    toPath('src/assets/scss/utils/_mixins.scss'),
    toPath('src/assets/scss/utils/_functions.scss'),
    toPath('src/assets/scss/utils/_global-vars.scss'),
  ],
  sassConfig: {
    includePaths: [
      // include util paths (similar to next.config.js)
      toPath('src/assets/scss'),
      toPath('src/assets/scss/utils'),
    ],
    // need to handle URLs to node_modules with custom function that will be run on every `@use` or `@import`
    // https://sass-lang.com/documentation/js-api#importer
    importer: [
      (url, prev) => {
        if (!url.startsWith('~')) return null;
        
        // the url is (for example) `~bootstrap/scss/variables`, so get rid of the `~` and map to the node_modules folder
        const cleanUrl = url.slice(1);
        return {
          file: toPath(`node_modules/${cleanUrl}`),
        };
      }
    ],
  }
}
