/**
 * Use to remove parentheses and everything inside the parentheses
 */
export const removeParentheses = (str: string): string => {
  return str.replace(/ *\([^)]*\) */g, '');
};

/**
 * { ...object1, ...object2 }, but for many objects.
 */
export const joinObjects = <T extends {}>(...objects: T[]) =>
  objects.reduce((prev, cur) => ({ ...prev, ...cur }), {});
