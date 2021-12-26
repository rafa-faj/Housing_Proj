import React, { FunctionComponent } from 'react';
import * as z from 'zod';
import styles from './Page.module.scss';
import { objectFilter, TransformArray } from '@utils';
import { WizardFormStep, SetStore, CheckBoxGroup, Subtitle2 } from '@basics';
import cn from 'classnames';
import { genders, habits } from '@constants';

export type GenderStore = TransformArray<typeof genders, boolean>;
export type HabitStore = TransformArray<typeof habits, boolean>;
export type GenderStoreZod = TransformArray<typeof genders, z.ZodBoolean>;
export type HabitStoreZod = TransformArray<typeof habits, z.ZodBoolean>;

const genderMap: GenderStoreZod = Object.assign(
  {},
  ...genders.map((g) => ({ [g]: z.boolean() })),
);

const habitsMap: HabitStoreZod = Object.assign(
  {},
  ...habits.map((h) => ({ [h]: z.boolean() })),
);

export const page6Schema = z.object({
  ...genderMap,
  ...habitsMap,
});

const defaultGenderpref = Object.assign(
  {},
  ...genders.map((g) => ({ [g]: false })),
) as GenderStore;

const defaultHabitrpref = Object.assign(
  {},
  ...habits.map((h) => ({ [h]: false })),
) as HabitStore;

export type Page6Store = z.infer<typeof page6Schema>;

export const page6InitialStore: Page6Store = {
  ...defaultGenderpref,
  ...defaultHabitrpref,
} as Page6Store;

interface PartProps {
  setStore: SetStore<Page6Store>;
}

const Part2: FunctionComponent<PartProps & HabitStore> = ({
  setStore,
  ...selectedHabits
}) => (
  <>
    <div className={cn('d-flex flex-column', styles.section)}>
      <Subtitle2
        className={cn(
          styles.subtitle2,
          styles.sectionSubtitle2,
          'text-left',
          'mb-3',
        )}
      >
        Habits
      </Subtitle2>
      <div className={styles.sectionWrapper}>
        <CheckBoxGroup
          buttonProps={habits.map((habit) => ({
            value: habit,
            withLabel: true,
            name: 'habit',
            defaultChecked: selectedHabits[habit],
            onChange: (value, state) =>
              setStore({
                [value]: state,
              }),
          }))}
        />
      </div>
    </div>
  </>
);

const Page6: FunctionComponent<WizardFormStep<Page6Store>> = ({
  setStore,
  ...props
}) => {
  const selectedGenderPreferences = objectFilter(props, (key) =>
    genders.includes(key as Partial<keyof GenderStore>),
  ) as GenderStore;
  const genderUI = (
    <div className={cn('d-flex flex-column', styles.section)}>
      <Subtitle2
        className={cn(
          styles.subtitle2,
          styles.sectionSubtitle2,
          'text-left',
          'mb-3',
        )}
      >
        Gender
      </Subtitle2>
      <div className={styles.sectionWrapper}>
        <CheckBoxGroup
          buttonProps={genders.map((genderOption) => ({
            value: genderOption,
            withLabel: true,
            name: 'gender',
            onChange: (value, state) =>
              setStore({
                [value]: state,
              }),
            checked: selectedGenderPreferences[genderOption],
          }))}
        />
      </div>
    </div>
  );

  return (
    <div className={styles.pageHeight}>
      <Subtitle2 className={styles.subtitle2}>Other requests</Subtitle2>
      <div className={styles.sectionBottom}>
        <Subtitle2 className={cn(styles.subtitle2, styles.sectionSubtitle2)}>
          Who do you want to live with?
        </Subtitle2>
      </div>
      {genderUI}
      <Part2
        setStore={setStore}
        {...(objectFilter(props, (key) =>
          habits.includes(key as Partial<keyof HabitStore>),
        ) as HabitStore)}
      />
    </div>
  );
};
export default Page6 as FunctionComponent;
