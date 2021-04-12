import { Month, MonthAbrv, monthsUnabrvToAbrv } from '@constants';

/**
 * Use to abbreviate a month
 * @param month - the month to abbreviate (must be in the enum 'months')
 */
export const abbreviateMonth = (month: Month): MonthAbrv => {
  return monthsUnabrvToAbrv[month];
};
