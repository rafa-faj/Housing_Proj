/**
 * Use to abbreviate address to only everything before the first comma
 */
export const abbreviateAddress = (address: string): string => {
  return address.split(',')[0];
};
