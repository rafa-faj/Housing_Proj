import React, { useState } from 'react';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import styles from './DatePicker.module.scss';
import { miscIcons } from '@icons';
import cn from 'classnames';

const PrevArrow = () => (
  <miscIcons.largeLeftArrow className={cn(styles.arrow, styles.left)} />
);

const NextArrow = () => (
  <miscIcons.largeRightArrow className={cn(styles.arrow, styles.right)} />
);

const RangeArrow = () => (
  <miscIcons.largeRightArrow className={cn(styles.arrow)} />
);

type CalendarDate = moment.Moment | null;

function DatePicker() {
  const [dateRange, setDateRange] = useState<{
    startDate: CalendarDate;
    endDate: CalendarDate;
  }>({
    startDate: null,
    endDate: null,
  });
  const [focus, setFocus] = useState<'startDate' | 'endDate' | null>(null);

  const { startDate, endDate } = dateRange;

  const handleOnDateChange = ({
    startDate,
    endDate,
  }: {
    startDate: CalendarDate;
    endDate: CalendarDate;
  }) => {
    setDateRange({ startDate, endDate });
  };
  return (
    <DateRangePicker
      startDatePlaceholderText="Start"
      startDate={startDate}
      onDatesChange={handleOnDateChange}
      endDatePlaceholderText="End"
      endDate={endDate}
      numberOfMonths={1}
      displayFormat="MMM D"
      showClearDates={true}
      focusedInput={focus}
      keepOpenOnDateSelect={true}
      onFocusChange={(focus) => setFocus(focus)}
      startDateId="startDateMookh"
      endDateId="endDateMookh"
      customArrowIcon={<RangeArrow />}
      minimumNights={0}
      navPrev={<PrevArrow />}
      navNext={<NextArrow />}
    />
  );
}

export default DatePicker;
