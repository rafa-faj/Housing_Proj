import {
  Dropdown,
  RadioGroup,
  RequiredAsterisk,
  Subtitle2,
  ToggleGroup,
  Tooltip,
  WizardFormStep
} from '@basics';
import {
  NON_EMPTY_ERR_MSG,
  roomCapacities,
  RoomCapacity,
  roomTypes
} from '@constants';
import { Icon as IconType, roomTypeIconsTemp } from '@icons';
import { runNTimes } from '@utils';
import cn from 'classnames';
import React, { FunctionComponent } from 'react';
import * as z from 'zod';
import styles from './Page.module.scss';

export type RoomCapacityStore = Record<RoomCapacity, boolean>;
export type RoomCapacityStoreZod = Record<RoomCapacity, z.ZodBoolean>;

const roomCapacityMap: RoomCapacityStoreZod = Object.assign(
  {},
  ...roomCapacities.map((rc) => ({ [rc]: z.boolean() })),
);

export const page2Schema = z
  .object({
    roomType: z.string().nonempty(NON_EMPTY_ERR_MSG),
    ...roomCapacityMap,
    lookingForCount: z.string(),
  })
  .refine(
    (data) => data.Single || data.Double || data.Triple,
    NON_EMPTY_ERR_MSG,
  );

export type Page2Store = z.infer<typeof page2Schema> & RoomCapacityStore;

const defaultRoomCapacity = Object.assign(
  {},
  ...roomCapacities.map((rc) => ({ [rc]: false })),
) as RoomCapacityStore;

export const page2InitialStore: Page2Store = {
  ...defaultRoomCapacity,
  roomType: '',
  lookingForCount: '',
};

const people = runNTimes(6, (i) => (i + 1).toString());

type roomToIconOptions = { [key: string]: IconType };

const roomToIcon: roomToIconOptions = {
  Single: roomTypeIconsTemp.single,
  Double: roomTypeIconsTemp.double,
  Triple: roomTypeIconsTemp.triple,
};

const roomTypeInfo =
  '• Master Bedroom = bedroom with bathroom \n • Guest Bedroom = standard bedroom \n• Living Room =  divided common area for bed \n• Den = secondary converted common area \n';

const Page2: FunctionComponent<WizardFormStep<Page2Store>> = ({
  setStore,
  roomType = '',
  validations,
  Single,
  Double,
  Triple,
  lookingForCount = '',
}) => {
  const roomCapBoolMap = { Single, Double, Triple };
  const roomCapacityInitialSelected = Object.keys(roomCapBoolMap).filter(
    (elem) => roomCapBoolMap[elem as keyof typeof roomCapBoolMap],
  );
  const roomCapacityUI = (
    <div className={styles.section}>
      <h5 className={styles.title3}>
        How many people does the listed room hold? <RequiredAsterisk />
      </h5>
      <div className={cn(styles.offset, 'mt-3')}>
        <ToggleGroup
          content={roomCapacities.map((room) => ({
            icon: roomToIcon[room],
            label: room,
          }))}
          className={styles.leftAlign}
          error={
            // Error UI should only be displayed when there is nothing selected in the current group and there is an zod error.
            !!roomCapacityInitialSelected &&
            (validations?.Single?.error ||
              validations?.Double?.error ||
              validations?.Triple?.error)
          }
          onSelect={(newlySelected) => {
            setStore({ [newlySelected.label]: newlySelected.selected });
          }}
          initialSelected={roomCapacityInitialSelected}
          toggleClassName={'mt-0'}
        />
      </div>
    </div>
  );

  const roomTypeUI = (
    <div className={styles.section}>
      <h5 className={styles.title}>
        What kind of room is this? <RequiredAsterisk />{' '}
        <span className={styles.inline}>
          <Tooltip isSingleLine={false} title={roomTypeInfo} maxWidth={600} />
        </span>
      </h5>
      <RadioGroup
        className={cn(styles.radioGroup, styles.offset)}
        error={validations?.roomType?.error}
        wrapperClass={styles.radioMarginLarge}
        buttonProps={roomTypes.map((room) => ({
          value: room,
          withLabel: true,
          name: 'room',
          checked: roomType === room,
          onChange: (event) =>
            setStore({
              roomType: event.target.value,
            }),
        }))}
      />
    </div>
  );

  const peopleCntUI = (
    <div className={styles.lastSection}>
      <h5 className={styles.title}>
        How many people are you looking to fill this space?
      </h5>
      <div className={'d-flex'}>
        <Dropdown
          options={people}
          placeholder="--"
          className={styles.small}
          onSelect={(e) => setStore({ lookingForCount: e ? e : undefined })}
          initialSelected={lookingForCount}
        />
        <span className={styles.text}>people</span>
      </div>
    </div>
  );

  return (
    <div className={styles.pageHeight}>
      <Subtitle2 className={styles.subtitle2}>List one room</Subtitle2>
      <div className={styles.description}>
        {roomCapacityUI}
        {roomTypeUI}
        {peopleCntUI}
      </div>
    </div>
  );
};
export default Page2 as FunctionComponent;
