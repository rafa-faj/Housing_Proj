/** Format availability for student posting */
export const formatAvail = (
  availMonth: string,
  availYear: string,
  untilMonth: string,
  untilYear: string,
) =>
  `${availMonth.slice(0, 3)} ${availYear} - ${untilMonth.slice(
    0,
    3,
  )} ${untilYear}`;
