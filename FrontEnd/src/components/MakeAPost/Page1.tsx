import React, { FunctionComponent } from 'react';
import {
  WizardFormStep,
  GooglePlaceAutoComplete,
  SetStore,
  Dropdown,
  Subtitle2,
  Input,
  RequiredAsterisk,
} from '@basics';
import { amenityIcons, miscIcons } from '@icons';
import { ArrayUnionTransform, runNTimes } from '@utils';
import cn from 'classnames';
import { Row } from 'react-bootstrap';
import * as z from 'zod';
import styles from './Page.module.scss';
import { NON_EMPTY_ERR_MSG } from '@constants';

const housingType = ['House', 'Apartment', 'Condo'] as const;
const rooms = runNTimes(6, (i) => (i + 1).toString());
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

interface DropDownProps {
  setStore: SetStore<Page1Store>;
  type: string;
  validations: any;
  initialSelected: string;
}

const Page1: FunctionComponent<WizardFormStep<Page1Store>> = ({
  setStore,
  validations,
  address,
  placeName,
  numBed,
  numBath,
}) => {
  const RoomDropdown: FunctionComponent<DropDownProps> = ({
    type,
    initialSelected,
  }) => (
    <Dropdown
      options={rooms}
      placeholder="--"
      className={styles.small}
      onSelect={(e) => setStore({ [type]: e })}
      error={validations?.[type as keyof typeof validations]?.error}
      initialSelected={initialSelected}
    />
  );

  const placeNameUI = (
    <div className={styles.section}>
      <h5 className={styles.title}>
        What is the name of the place? <RequiredAsterisk />
      </h5>
      <Input
        placeholder="e.g the apartment name or townhouse"
        icon={{ icon: miscIcons.house }}
        value={placeName}
        error={validations?.placeName?.error}
        onChange={(event) =>
          setStore({
            placeName: event.target.value as Partial<TypesOfRooms>,
          })
        }
      />
    </div>
  );

  const addressUI = (
    <div className={styles.section}>
      <h5 className={styles.title}>
        What is the address of the listing? <RequiredAsterisk />
      </h5>
      <GooglePlaceAutoComplete
        defaultAddress={address}
        error={validations?.address?.error}
        onSelect={(addressSelected) => {
          setStore({
            address: addressSelected,
          });
        }}
      />
    </div>
  );

  const roomInfoUI = (
    <div className={styles.lastSection}>
      <h5 className={styles.title}>
        How many bedrooms and bathrooms? <RequiredAsterisk />
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
            initialSelected={numBed || ''}
          />
        </div>
        <div className="d-flex">
          <div className={cn(styles.svgFilled, styles.iconWithDropdown)}>
            <amenityIcons.Bath />
          </div>
          <RoomDropdown
            setStore={setStore}
            validations={validations}
            type="numBath"
            initialSelected={numBath || ''}
          />
        </div>
      </Row>
    </div>
  );

  return (
    <div className={styles.pageHeight}>
      <Subtitle2 className={styles.subtitle2}>About the listing</Subtitle2>
      <div className={styles.description}>
        {placeNameUI}
        {addressUI}
        {roomInfoUI}
      </div>
    </div>
  );
};

export default Page1 as FunctionComponent;
