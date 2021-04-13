import React, { useState, FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, newHousingPost } from '@redux';
import { User } from '../../models/User';
import HouseProfile, { PreviewData } from '../HouseProfile/HouseProfile';
import { facilityToIcon } from '../HouseProfile/SecondColumn/SecondColumn';
import Page1, { Page1Store, page1InitialStore, page1Schema } from './PostPage1';
import Page2, { Page2Store, page2InitialStore, page2Schema } from './PostPage2';
import Page3, { Page3Store, page3InitialStore, page3Schema } from './PostPage3';
import Page4, { Page4Store, page4InitialStore, page4Schema } from './PostPage4';
import Page5, { Page5Store, page5InitialStore, page5Schema } from './PostPage5';
import Page6, { Page6Store, page6InitialStore, page6Schema } from './PostPage6';
import { WizardForm } from '@basics';
import {
  CreateHousePostProperties,
  HousePostUserData,
} from '../../models/PostModels';
import { formatMoveIn, formatRoomType } from '../../utils';

type Store = Page1Store &
  Page2Store &
  Page3Store &
  Page4Store &
  Page5Store &
  Page6Store;

const initialStore = [
  page1InitialStore,
  page2InitialStore,
  page3InitialStore,
  page4InitialStore,
  page5InitialStore,
  page6InitialStore,
];

const schemas = [
  page1Schema,
  page2Schema,
  page3Schema,
  page4Schema,
  page5Schema,
  page6Schema,
];

interface HousingPostProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const storeToHouseData = ({
  propertyType,
  selectedLocation,
  price,
  stayPeriod,
  earlyInterval,
  earlyMonth,
  lateInterval,
  lateMonth,
  numBeds,
  numBaths,
  roomType,
  pictures,
  preferences,
  amenities,
  roomDescription,
}: Store): CreateHousePostProperties => {
  return {
    name: propertyType,
    location: selectedLocation,
    distance: '___ min', // will calculate the minutes in the API post, showing as '___'
    pricePerMonth: price,
    stayPeriod,
    early: `${earlyInterval} ${earlyMonth}`,
    late: `${lateInterval} ${lateMonth}`,
    roomType, // TODO need to change database to hold array of strings
    numBeds,
    numBaths,
    photos: pictures,
    other: preferences,
    facilities: amenities as (keyof typeof facilityToIcon)[],
    negotiable: false,
    roomDescription,
  };
};

const userToHousePostUser = ({
  name,
  email,
  phone,
  major,
  schoolYear,
}: User): HousePostUserData => ({
  leaserName: name,
  leaserEmail: email,
  leaserPhone: phone,
  leaserSchoolYear: schoolYear,
  leaserMajor: major,
  profilePhoto: '', // TODO need to actually have profile photo here
});

const HousingPost: FunctionComponent<HousingPostProps> = ({
  show: showForm,
  setShow: setShowForm,
}) => {
  const [previewData, setPreviewData] = useState<PreviewData>();
  const hidePreview = () => setPreviewData(undefined);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  if (!user) return <div />;

  return (
    <>
      {previewData && (
        <HouseProfile
          onExit={() => {
            hidePreview();
            setShowForm(true);
          }}
          preview
          data={previewData}
          onPublish={() => {
            if (houseData && previewData) {
              // TODO need to change this to use previewData somehow. Also need to just use a straightup API and then mutate the roomIds with whatever is returned
              dispatch(
                newHousingPost({
                  ...houseData,
                  photos: previewData.photos,
                }),
              );
              hidePreview();
            }

            // TODO need to reset the form here
          }}
        />
      )}

      <WizardForm<Store>
        show={showForm && !previewData}
        onHide={() => setShowForm(false)}
        onSubmit={(unformattedData) => {
          console.log('clicked');
          console.log(unformattedData);

          const data = {
            ...storeToHouseData(unformattedData),
            ...userToHousePostUser(user),
          };
          const formattedMoveIn = formatMoveIn(data.early, data.late);
          const roomType = formatRoomType(data.roomType);

          setPreviewData({
            ...data,
            formattedMoveIn,
            roomType,
          });

          return true;
        }}
        title="Make your post"
        initialStore={initialStore}
        schemas={schemas}
        lastButtonText="Preview"
      >
        <Page1 />
        <Page2 />
        <Page3 />
        <Page4 />
        <Page5 />
        <Page6 />
      </WizardForm>
    </>
  );
};

export default HousingPost;
