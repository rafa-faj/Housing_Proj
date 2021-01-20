/**
 * Use to remove parentheses and everything inside the parentheses
 */
export const removeParentheses = (str: string): string => {
  return str.replace(/ *\([^)]*\) */g, '');
};
