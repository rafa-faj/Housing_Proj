import React, { FunctionComponent } from 'react';
import {
  amenityToIcon,
  ToggleGroup,
  WizardFormStep,
  Subtitle2,
} from '@basics';
import * as z from 'zod';
import styles from './Page.module.scss';
import cn from 'classnames';
import { NON_EMPTY_ERR_MSG } from '@constants';
import { TransformArray } from '@utils';
import { customModifierFunc } from '@basics';

export type Page5Store = {
  [T in Partial<keyof typeof amenityToIcon>]: boolean;
};

export const displayAmenities: Partial<keyof typeof amenityToIcon>[] = [
  'Common Area',
  'Pet Friendly',
  'Furnished',
  'A/C',
  'No Smoking',
  'Indoor Laundry',
  'Outdoor Parking',
  'Indoor Parking',
  'Swimming Pool',
  'Hardwood Floor',
  'Elevator',
  'Gym',
];

export type AmenityStoreZod = TransformArray<
  typeof displayAmenities,
  z.ZodBoolean
>;

export const page5Schema = z
  .object(
    displayAmenities.reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: z.boolean(),
      }),
      {},
    ) as AmenityStoreZod,
  )
  .refine(
    (data) =>
      !!data['Common Area'] ||
      !!data['Pet Friendly'] ||
      !!data['Furnished'] ||
      !!data['A/C'] ||
      !!data['No Smoking'] ||
      !!data['Indoor Laundry'] ||
      !!data['Outdoor Parking'] ||
      !!data['Indoor Parking'] ||
      !!data['Swimming Pool'] ||
      !!data['Hardwood Floor'] ||
      !!data['Elevator'] ||
      !!data['Gym'],
    NON_EMPTY_ERR_MSG,
  );

export const zodAmenityGroupSet: customModifierFunc<Page5Store> = (
  curIndex: number,
  success: boolean,
  storeValues: Partial<Page5Store>,
) => {
  if (curIndex == 4) {
    const error =
      storeValues['Common Area'] ||
      storeValues['Pet Friendly'] ||
      storeValues['Furnished'] ||
      storeValues['A/C'] ||
      storeValues['No Smoking'] ||
      storeValues['Indoor Laundry'] ||
      storeValues['Outdoor Parking'] ||
      storeValues['Indoor Parking'] ||
      storeValues['Swimming Pool'] ||
      storeValues['Hardwood Floor'] ||
      storeValues['Elevator'] ||
      storeValues['Gym']
        ? undefined
        : {
            code: z.ZodIssueCode.custom,
            path: [],
            message: 'at least one amenity must be selected',
          };
    const result = { success, error };
    return {
      'Common Area': result,
      'Pet Friendly': result,
      Furnished: result,
      'A/C': result,
      'No Smoking': result,
      'Indoor Laundry': result,
      'Outdoor Parking': result,
      'Indoor Parking': result,
      'Swimming Pool': result,
      'Hardwood Floor': result,
      Elevator: result,
      Gym: result,
    };
  }
  return {};
};

export const page5InitialStore: Page5Store = displayAmenities.reduce(
  (prev, curr) => ({ ...prev, [curr]: false }),
  {},
) as Page5Store;

const Page5: FunctionComponent<WizardFormStep<Page5Store>> = ({
  setStore,
  validations,
  ...props
}) => {
  return (
    <div className={styles.pageHeight}>
      <Subtitle2 className={styles.subtitle2}>Amenities</Subtitle2>
      <div className={styles.description}>
        <Subtitle2 className={cn(styles.subtitle2, styles.sectionSubtitle2)}>
          What does your home offer? <span className={styles.required}>*</span>
        </Subtitle2>
        <div className={styles.body3}>Please select all that apply</div>
      </div>
      <ToggleGroup
        vertical={true}
        content={displayAmenities.map((amenity) => ({
          icon: amenityToIcon[amenity],
          label: amenity,
        }))}
        onSelect={(newlySelected) => {
          setStore({ [newlySelected.label]: newlySelected.selected });
        }}
        error={
          validations?.['Common Area']?.error &&
          validations?.['Pet Friendly']?.error &&
          validations?.['Furnished']?.error &&
          validations?.['A/C']?.error &&
          validations?.['No Smoking']?.error &&
          validations?.['Indoor Laundry']?.error &&
          validations?.['Outdoor Parking']?.error &&
          validations?.['Indoor Parking']?.error &&
          validations?.['Swimming Pool']?.error &&
          validations?.['Hardwood Floor']?.error &&
          validations?.['Elevator']?.error &&
          validations?.['Gym']?.error
        }
        initialSelected={displayAmenities.filter((elem) => props[elem])}
        className={styles.top4NoMargin}
      />
    </div>
  );
};
export default Page5 as FunctionComponent;
