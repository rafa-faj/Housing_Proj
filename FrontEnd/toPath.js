const path = require('path');

/**
 * Can use in other files to get the absolute path to a directory or file.
 * Pass in a string that represents the relative path starting from the 
 * root of the Frontend folder.
 * 
 * For example, if you wanted the path to the `pages` folder, you would
 * do `toPath('src/pages')`. Do *not* use `.` or `..` in the relative path.
 * 
 * @param _path the relative path to a folder or file, starting from the root
 *              Frontend folder.
 * @returns the absolute path to the provided argument.
 */
const toPath = (_path) => path.join(__dirname, _path);

module.exports = {
  toPath,
};
