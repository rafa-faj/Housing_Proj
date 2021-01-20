/**
 * Checks if the first element in the provided array is a string.
 * If the array is empty, then it will return the second param (default = true).
 */
export const isStringArray = (
  x: any,
  ifEmpty: boolean = true,
): x is string[] => {
  if (!Array.isArray(x)) return false;

  if (x.length == 0) return ifEmpty;

  return typeof x[0] === 'string';
};

/**
 * Checks if the parameter is a number (during runtime).
 */
export const isNumber = (x: any): x is number => {
  return typeof x === 'number';
};

/**
 * Checks if the parameter is a string (during runtime).
 */
export const isString = (x: any): x is string => {
  return typeof x === 'string';
};
