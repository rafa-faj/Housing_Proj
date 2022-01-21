import React, { FunctionComponent } from 'react';
import { SectionTitle, Body2, Chip } from '@basics';
import styles from './LookingFor.module.scss';
import { chipIcons, Icon } from '@icons';
import { Gender, Habit } from '@constants/preferences';

interface LookingFor {
  genders: Gender[];
  habits: Habit[];
  placeDescription: string;
}

export const LookingForIconMap: Partial<{ [key in Gender | Habit]: Icon }> = {
  '420 Friendly': chipIcons._420Friendly,
  Clean: chipIcons.Clean,
  'Prefer female': chipIcons.FemaleOnly,
  Inclusive: chipIcons.Inclusive,
  'LGBTQ+ Friendly': chipIcons.LGBTQ,
  'Prefer male': chipIcons.Male,
  'No Drinking': chipIcons.NoDrinking,
  'No Party': chipIcons.NoParty,
  'Overnight Guest OK': chipIcons.OvernightGuest,
};

export type IconKey = Partial<keyof typeof LookingForIconMap>;

const IconKeys = Object.keys(LookingForIconMap) as IconKey[];

const LookingFor: FunctionComponent<LookingFor> = ({
  genders,
  habits,
  placeDescription,
}) => (
  <div className={styles.wrapper}>
    <SectionTitle>Looking For</SectionTitle>
    <div className={styles.gender}>
      <div className={styles.header}>Gender</div>
      <div className={styles.chipWrap}>
        {genders.length > 0 ? (
          genders.map((gender) => (
            <Chip
              state={'default'}
              text={gender}
              dismiss={false}
              icon={
                IconKeys.includes(gender)
                  ? LookingForIconMap[gender]
                  : undefined
              }
            />
          ))
        ) : (
          <div className="d-flex align-items-center">N/A</div>
        )}
      </div>
    </div>
    <div className={styles.habits}>
      <div className={styles.header}>Habits</div>
      <div className={styles.chipWrap}>
        {habits.length > 0 ? (
          habits.map((habit) => (
            <Chip
              state={'default'}
              text={habit}
              dismiss={false}
              icon={
                IconKeys.includes(habit) ? LookingForIconMap[habit] : undefined
              }
            />
          ))
        ) : (
          <div className="d-flex align-items-center">N/A</div>
        )}
      </div>
    </div>
    <Body2 className={styles.description}>{placeDescription}</Body2>
  </div>
);

export default LookingFor;
