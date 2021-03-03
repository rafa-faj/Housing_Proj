/**
 * Checks if the first element in the provided array is a string.
 * If the array is empty, then it will return the second param.
 */
export const isStringArray = (
  array: any[],
  ifEmpty: boolean = true,
): boolean => {
  if (array.length == 0) return ifEmpty;

  return typeof array[0] === 'string';
};
