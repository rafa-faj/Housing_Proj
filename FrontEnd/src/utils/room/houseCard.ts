/**
 * Use to format rent string, as returned from BE
 * @param rent - rent to format
 */
export const formatHouseCardRent = (rent: string): string => {
  return rent.split('-')[0];
};
