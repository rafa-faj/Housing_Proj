import React, { FunctionComponent } from 'react';
import {
  WizardFormStep,
  GooglePlaceAutoComplete,
  SetStore,
  Dropdown,
  Subtitle2,
  Input,
} from '@basics';
import { amenityIcons, miscIcons } from '@icons';
import { ArrayUnionTransform } from '@utils';
import cn from 'classnames';
import { Row } from 'react-bootstrap';
import * as z from 'zod';
import styles from './Page.module.scss';
import { NON_EMPTY_ERR_MSG } from '@constants';

const housingType = ['House', 'Apartment', 'Condo'] as const;
const rooms = Array.from({ length: 6 }, (_, i) => (i + 1).toString());
type TypesOfRooms = ArrayUnionTransform<typeof housingType>;

export const page1Schema = z.object({
  address: z.string().nonempty(NON_EMPTY_ERR_MSG),
  numBed: z.string().nonempty(NON_EMPTY_ERR_MSG),
  numBath: z.string().nonempty(NON_EMPTY_ERR_MSG),
  placeName: z.string().nonempty(NON_EMPTY_ERR_MSG),
});

export type Page1Store = z.infer<typeof page1Schema>;

export const page1InitialStore: Page1Store = {
  address: '',
  numBed: '',
  numBath: '',
  placeName: '',
};

interface PartProps {
  setStore: SetStore<Page1Store>;
  validations: any;
}

interface DropDownProps {
  setStore: SetStore<Page1Store>;
  type: string;
  validations: any;
  initialSelected: string;
}

const Part1: FunctionComponent<PartProps & { placeName: string }> = ({
  setStore,
  validations,
  placeName,
}) => (
  <div className={styles.section}>
    <h5 className={styles.title}>
      What is the name of the place? <span className={styles.required}>*</span>
    </h5>
    <Input
      placeholder="e.g the apartment name or townhouse"
      icon={{ icon: miscIcons.house }}
      value={placeName}
      error={validations?.placeName?.error}
      onChange={(event: any) =>
        setStore({
          placeName: (event.target as HTMLInputElement)
            .value as Partial<TypesOfRooms>,
        })
      }
    />
  </div>
);

const Part2: FunctionComponent<PartProps & { address: string }> = ({
  setStore,
  validations,
  address,
}) => (
  <div className={styles.section}>
    <h5 className={styles.title}>
      What is the address of the listing?{' '}
      <span className={styles.required}>*</span>
    </h5>
    <GooglePlaceAutoComplete
      defaultAddress={address}
      error={validations?.address?.error}
      onSelect={(addressSelected) => {
        setStore({
          address: addressSelected,
        });
      }}
    ></GooglePlaceAutoComplete>
  </div>
);

const RoomDropdown: FunctionComponent<DropDownProps> = ({
  setStore,
  validations,
  type,
  initialSelected,
}) => (
  <Dropdown
    options={rooms}
    placeholder="--"
    className={styles.small}
    onSelect={(e) => setStore({ [type]: e ? e : undefined })}
    error={validations?.[type]?.error}
    initialSelected={initialSelected}
  ></Dropdown>
);

const Part3: FunctionComponent<
  PartProps & { numBed: string; numBath: string }
> = ({ setStore, validations, numBed, numBath }) => (
  <div className={styles.lastSection}>
    <h5 className={styles.title}>
      How many bedrooms and bathrooms?{' '}
      <span className={styles.required}>*</span>
    </h5>
    <Row>
      <div className={cn('d-flex', styles.dropdownGroup)}>
        <div className={cn(styles.svgFilled, styles.iconWithDropdown)}>
          <amenityIcons.Furnished />
        </div>
        <RoomDropdown
          setStore={setStore}
          validations={validations}
          type="numBed"
          initialSelected={numBed}
        ></RoomDropdown>
      </div>
      <div className="d-flex">
        <div className={cn(styles.svgFilled, styles.iconWithDropdown)}>
          <amenityIcons.Bath></amenityIcons.Bath>
        </div>
        <RoomDropdown
          setStore={setStore}
          validations={validations}
          type="numBath"
          initialSelected={numBath}
        ></RoomDropdown>
      </div>
    </Row>
  </div>
);

const Page1: FunctionComponent<WizardFormStep<Page1Store>> = ({
  setStore,
  validations,
  address,
  placeName,
  numBed,
  numBath,
}) => {
  return (
    <div className={styles.pageHeight}>
      <Subtitle2 className={styles.subtitle2}>About the listing</Subtitle2>
      <div className={styles.description}>
        <Part1
          setStore={setStore}
          validations={validations}
          placeName={placeName || ''}
        ></Part1>
        <Part2
          setStore={setStore}
          validations={validations}
          address={address || ''}
        ></Part2>
        <Part3
          setStore={setStore}
          validations={validations}
          numBed={numBed || ''}
          numBath={numBath || ''}
        ></Part3>
      </div>
    </div>
  );
};
export default Page1 as FunctionComponent;
