/** Format availability for student posting */
export const formatAvail = (
  availMonth: string,
  availYear: string,
  untilMonth: string,
  untilYear: string,
) => {
  const availMonthAbbr = availMonth.slice(0, 3);
  const untilMonthAbbr = untilMonth.slice(0, 3);

  return `${availMonthAbbr} ${availYear} - ${untilMonthAbbr} ${untilYear}`;
};
