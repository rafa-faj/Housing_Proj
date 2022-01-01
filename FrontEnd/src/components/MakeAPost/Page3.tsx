import {
  DatePicker,
  Dropdown,
  RequiredAsterisk,
  Subtitle2,
  Tooltip,
  WizardFormStep,
} from '@basics';
import { Month, months, NON_EMPTY_ERR_MSG } from '@constants';
import { runNTimes } from '@utils';
import cn from 'classnames';
import moment from 'moment';
import React, { FunctionComponent, useEffect, useState } from 'react';
import * as z from 'zod';
import styles from './Page.module.scss';

export type Page3Store = z.infer<typeof page3Schema>;

export const page3Schema = z
  .object({
    availMonth: z.string().nonempty(NON_EMPTY_ERR_MSG),
    availYear: z.string().nonempty(NON_EMPTY_ERR_MSG),
    untilMonth: z.string().nonempty(NON_EMPTY_ERR_MSG),
    untilYear: z.string().nonempty(NON_EMPTY_ERR_MSG),
    startDate: z.string(),
    endDate: z.string(),
  })
  .refine((data) => {
    if (
      data.availMonth &&
      data.availYear &&
      data.untilMonth &&
      data.untilYear
    ) {
      return (
        (months.indexOf(data.availMonth as Month) <=
          months.indexOf(data.untilMonth as Month) &&
          parseInt(data.availYear) == parseInt(data.untilYear)) ||
        parseInt(data.availYear) < parseInt(data.untilYear)
      );
    }
    // Not all entries are filled.
    return true;
  }, 'Invalid month/year entered.');

export const page3InitialStore: Page3Store = {
  availMonth: '',
  availYear: '',
  untilMonth: '',
  untilYear: '',
  startDate: '',
  endDate: '',
};

const roomType = [
  'Master Bedroom',
  'Guest Bedroom',
  'Den',
  'Living Room',
  'Other',
] as const;

const year = runNTimes(5, (i) =>
  (new Date().getFullYear().valueOf() + i).toString(),
);

const combineErrors = (validations: any) =>
  validations?.availMonth?.error ||
  validations?.availYear?.error ||
  validations?.untilMonth?.error ||
  validations?.untilYear?.error;

const moveInInfo: string =
  'This is an optional input that can help renters know when they are able to move into the place.\n\n Click “Start” to open a calendar to select a range of dates.';

const Page3: FunctionComponent<WizardFormStep<Page3Store>> = ({
  setStore,
  validations,
  availMonth,
  availYear,
  untilMonth,
  untilYear,
  startDate,
  endDate,
}) => {
  const [stayPeriodValidation, setStayPeriodValidation] = useState<
    string | z.ZodIssue | undefined
  >(combineErrors(validations));

  useEffect(() => {
    setStayPeriodValidation(combineErrors(validations));
  }, [validations]);

  const leasePeriodInitialSelects = {
    availMonth,
    availYear,
    untilMonth,
    untilYear,
  };

  const leasePeriodUI = (
    <div className={styles.section}>
      <h5 className={styles.title}>
        Available from <RequiredAsterisk />
      </h5>
      <div className="d-flex">
        <Dropdown
          options={months}
          placeholder="--"
          onSelect={(e) => setStore({ availMonth: e || undefined })}
          initialSelected={leasePeriodInitialSelects.availMonth}
        />
        <Dropdown
          options={year}
          placeholder="--"
          className={styles.small}
          // Needs to do `|| undefined` since no value for e means null but for availYear means undefined
          onSelect={(e) => setStore({ availYear: e || undefined })}
          initialSelected={leasePeriodInitialSelects.availYear}
        />
      </div>
      <h5 className={cn(styles.body, styles.title2)}>
        Until <RequiredAsterisk />
      </h5>
      <div className={cn('d-flex', styles.test)}>
        <Dropdown
          options={months}
          placeholder="--"
          onSelect={(e) => setStore({ untilMonth: e ? e : undefined })}
          initialSelected={leasePeriodInitialSelects.untilMonth}
        />
        <Dropdown
          options={year}
          placeholder="--"
          className={styles.small}
          onSelect={(e) => setStore({ untilYear: e ? e : undefined })}
          error={stayPeriodValidation}
          initialSelected={leasePeriodInitialSelects.untilYear}
        />
      </div>
    </div>
  );

  const moveInInitialSelects = { startDate, endDate };
  const moveInUI = (
    <div className={styles.lastSection}>
      <h5 className={cn(styles.title, styles.unbold)}>
        Preferred <span className={styles.bold}> move-in timeframe </span> for
        renters
        <span className={cn(styles.inline, styles.tooltipMargin)}>
          <Tooltip isSingleLine={false} title={moveInInfo}></Tooltip>
        </span>
      </h5>
      <DatePicker
        onChange={({ startDate, endDate }) =>
          setStore({
            startDate: startDate?.format('MMM/DD/YYYY') || '',
            endDate: endDate?.format('MMM/DD/YYYY') || '',
          })
        }
        defaultStartDate={
          moveInInitialSelects.startDate
            ? moment(moveInInitialSelects.startDate)
            : null
        }
        defaultEndDate={
          moveInInitialSelects.endDate
            ? moment(moveInInitialSelects.endDate)
            : null
        }
      />
    </div>
  );

  return (
    <div className={styles.pageHeight}>
      <Subtitle2 className={styles.subtitle2}>
        Rental period &amp; move-in timeframe
      </Subtitle2>
      <div className={styles.description}>
        {leasePeriodUI}
        {moveInUI}
      </div>
    </div>
  );
};

export default Page3 as FunctionComponent;
