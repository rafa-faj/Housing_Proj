const path = require('path');

/**
 * based off of: https://jestjs.io/docs/next/code-transformation
 */
module.exports = {
  process(src, filename, config, options) {
    // i.e. change `/src/assets/images/example.png` to `example.png`
    const baseFilename = JSON.stringify(path.basename(filename));
    return `module.exports = ${baseFilename};`;
  },
};
