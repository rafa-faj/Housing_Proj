import { Interval, intervals, Month, months } from '@constants';
import { abbreviateMonth, removeParentheses } from '@utils';

/**
 * Function used to validate move in select form
 * @param earlyMonth - the early month selected
 * @param earlyInterval - the early interval selected
 * @param lateMonth - the late month selected
 * @param lateInterval - the late interval selected
 */
export const moveInSelect = (
  earlyMonth: Month,
  earlyInterval: Interval,
  lateMonth: Month,
  lateInterval: Interval,
): boolean => {
  if (months.indexOf(earlyMonth) > months.indexOf(lateMonth)) {
    // neither has anytime as the option
    if (![earlyMonth, lateMonth].includes(Month.Anytime)) {
      return false;
    }
  }
  if (
    months.indexOf(earlyMonth) === months.indexOf(lateMonth) &&
    ![earlyMonth, lateMonth].includes(Month.Anytime)
  ) {
    // neither has anytime as the option
    if (
      ![earlyInterval, lateInterval].includes(Interval.Anytime) &&
      intervals.indexOf(earlyInterval) > intervals.indexOf(lateInterval)
    ) {
      return false;
    }
  }
  return true;
};

/**
 * Use to abbreviate moveIn string
 */
export const abbreviateMoveIn = (
  earlyInt: string,
  earlyMonth: Month,
  lateInt: string,
  lateMonth: Month,
): string => {
  // 1st pass: anytime from
  if (earlyInt === 'Anytime') {
    earlyInt = 'Early';
  }
  // 2nd pass: anytime to
  if (lateInt === 'Anytime') {
    lateInt = 'Late';
  }
  if (earlyMonth === lateMonth) {
    // 3rd pass: duplicates, or early - late
    if (earlyInt === lateInt) {
      return `${earlyInt} ${abbreviateMonth(earlyMonth)}`;
    }
    if (earlyInt === 'Early' && lateInt === 'Late') {
      return `${abbreviateMonth(earlyMonth)}`;
    }
  }
  return `${earlyInt} ${abbreviateMonth(
    earlyMonth,
  )} - ${lateInt} ${abbreviateMonth(lateMonth)}`;
};

/**
 * Used to format early and late strings returned from api call.
 *
 * @param early - the early string
 * @param late - the late string
 */
export const formatMoveIn = (early: string, late: string) => {
  const [earlyInt, earlyMonth] = early.split(' ') as [string, Month];
  const [lateInt, lateMonth] = late.split(' ') as [string, Month];

  const earlyIntDisplayed =
    earlyInt.toLowerCase() === 'anytime'
      ? earlyInt
      : removeParentheses(earlyInt);
  const lateIntDisplayed =
    lateInt.toLowerCase() === 'anytime' ? lateInt : removeParentheses(lateInt);

  const formattedMoveIn = abbreviateMoveIn(
    earlyIntDisplayed,
    earlyMonth,
    lateIntDisplayed,
    lateMonth,
  );
  return formattedMoveIn;
};
