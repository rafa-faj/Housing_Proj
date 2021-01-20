/**
 * Months in the year
 */
export enum Month {
  Anytime = 'Anytime',
  January = 'January',
  February = 'February',
  March = 'March',
  April = 'April',
  May = 'May',
  June = 'June',
  July = 'July',
  August = 'August',
  September = 'September',
  October = 'October',
  November = 'November',
  December = 'December',
}

export const months = Object.values(Month);

/**
 * Months in the year, abbreviated
 */
export enum MonthAbrv {
  Anytime = 'Anytime',
  January = 'Jan',
  February = 'Feb',
  March = 'Mar',
  April = 'Apr',
  May = 'May',
  June = 'Jun',
  July = 'Jul',
  August = 'Aug',
  September = 'Sep',
  October = 'Oct',
  November = 'Nov',
  December = 'Dec',
}

/**
 * object of month (unabbreviated) to month (abbreviated)
 */
export const monthsUnabrvToAbrv = {
  [Month.Anytime]: MonthAbrv.Anytime,
  [Month.January]: MonthAbrv.January,
  [Month.February]: MonthAbrv.February,
  [Month.March]: MonthAbrv.March,
  [Month.April]: MonthAbrv.April,
  [Month.May]: MonthAbrv.May,
  [Month.June]: MonthAbrv.June,
  [Month.July]: MonthAbrv.July,
  [Month.August]: MonthAbrv.August,
  [Month.September]: MonthAbrv.September,
  [Month.October]: MonthAbrv.October,
  [Month.November]: MonthAbrv.November,
  [Month.December]: MonthAbrv.December,
};
