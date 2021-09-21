import React, { FunctionComponent, useState } from 'react';
import { MakeAPost as MPIcons } from '@icons';
import { getDurationInMinutes } from '@apis';
import { StudentHousePostPreview } from '@components';
import { useDispatch } from 'react-redux';
import { useSWRConfig } from 'swr';
import { useShouldShowPost, hidePost, showPost, setShowPostType } from '@redux';
import Page1, { Page1Store, page1InitialStore, page1Schema } from './Page1';
import Page2, {
  Page2Store,
  page2InitialStore,
  page2Schema,
  zodRoomCapacityGroupSet,
  roomCapacity,
} from './Page2';
import Page3, {
  Page3Store,
  page3InitialStore,
  page3Schema,
  zodAvailabilityGroupSet,
} from './Page3';
import Page4, { Page4Store, page4InitialStore, page4Schema } from './Page4';
import Page5, {
  Page5Store,
  page5InitialStore,
  page5Schema,
  zodAmenityGroupSet,
  displayAmenities,
} from './Page5';
import Page6, {
  Page6Store,
  page6InitialStore,
  page6Schema,
  genders,
  habits,
} from './Page6';
import Page7, { Page7Store, page7InitialStore, page7Schema } from './Page7';
import Page8, { Page8Store, page8InitialStore, page8Schema } from './Page8';
import { StudentHousePost } from '@models';
import { useUser } from '@hooks';
import { generateHousingPost } from '@apis';
import { WizardForm } from '@basics';
import { SuccessPopUp } from './PopUps';
export type Store = Page1Store &
  Page2Store &
  Page3Store &
  Page4Store &
  Page5Store &
  Page6Store &
  Page7Store &
  Page8Store;
const schemas = [
  page1Schema,
  page2Schema,
  page3Schema,
  page4Schema,
  page5Schema,
  page6Schema,
  page7Schema,
  page8Schema,
];

interface UserContact {
  major: string;
  schoolYear: string;
  userPhone: string;
  userEmail: string;
  userBio: string;
  userName: string;
  userPhoto: string;
}

const dataProcessHelper = async (
  data: Store & UserContact,
): Promise<StudentHousePost> => {
  const amenities = displayAmenities.filter((elem) => data[elem]);
  const genderSelections = genders.filter((elem) => data[elem]);
  const habitSelections = habits.filter((elem) => data[elem]);
  const roomCapacities = roomCapacity.filter((elem) => data[elem]);
  const {
    availMonth,
    availYear,
    untilMonth,
    untilYear,
    startDate,
    endDate,
    rentCost,
    utilityCost,
    lookingForCount,
    photos,
    address,
    placeName,
    numBed,
    numBath,
    roomType,
    placeDescription,
    major,
    schoolYear,
    userName,
    userEmail,
    userPhone,
    userPhoto,
    userBio,
  } = data;
  const apiDistance = await getDurationInMinutes(address);
  const distance = apiDistance || 'N/A';

  return {
    major,
    schoolYear,
    userName,
    userEmail,
    userPhone,
    userPhoto,
    userBio,
    roomType,
    placeDescription,
    numBed,
    numBath,
    roomCapacities,
    address,
    placeName,
    distance,
    lookingForCount,
    startDate,
    endDate,
    amenities,
    availMonth,
    availYear,
    untilMonth,
    untilYear,
    photos,
    utility: utilityCost,
    genders: genderSelections,
    habits: habitSelections,
    rent: rentCost,
  };
};

const MakeAPost: FunctionComponent = () => {
  const initialStoreArray = [
    page1InitialStore,
    page2InitialStore,
    page3InitialStore,
    page4InitialStore,
    page5InitialStore,
    page6InitialStore,
    page7InitialStore,
    page8InitialStore,
  ];
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [cleanUp, setCleanUp] = useState<() => void>();
  const [previewData, setPreviewData] = useState<StudentHousePost>();
  const [initialStore, setInitialStore] = useState<Partial<Store>[]>(
    initialStoreArray,
  );

  const dispatch = useDispatch();
  const ShouldShowPost = useShouldShowPost();
  const { mutate } = useSWRConfig();

  const { data: user } = useUser();
  const major = user.isLoggedIn ? user.major : ''; // it should always be true. used for ts requirement
  const schoolYear = user.isLoggedIn ? user.schoolYear : '';
  const userPhone = user.isLoggedIn ? user.phone : '';
  const userEmail = user.isLoggedIn ? user.email : '';
  const userBio = user.isLoggedIn ? user.description : '';
  const userName = user.isLoggedIn ? user.name : '';
  const userPhoto = user.isLoggedIn ? user.profilePhoto : '';

  const postFunction = async () => {
    if (previewData) {
      const roomForm = new FormData();
      previewData.photos.forEach((photo) => roomForm.append('photos', photo));
      roomForm.append(
        'json',
        JSON.stringify({ ...previewData, photos: undefined }),
      );
      await generateHousingPost(roomForm);
    }
  };

  return (
    <>
      <SuccessPopUp
        open={showSuccess}
        onClose={() => {
          setShowSuccess(false);
        }}
      />

      {showPreview &&
        previewData && ( // need the preview data to be processed
          <StudentHousePostPreview
            post={postFunction}
            onSuccess={async () => {
              setShowPreview(false);
              setShowSuccess(true);
              setInitialStore(initialStoreArray); // clean up the form
              setPreviewData(undefined);
              setCleanUp(() => () => setCleanUp(undefined));
              dispatch(setShowPostType('student'));
              await mutate('/api/rooms');
            }}
            edit={() => {
              setShowPreview(false); // normally this isn't a problem, but we could use useEffect if there is
              dispatch(showPost());
            }}
            {...previewData}
          />
        )}

      <WizardForm<Store>
        show={ShouldShowPost}
        onHide={() => console.log('todo, shouldnt have an onHide for this...')}
        onSubmit={async (data) => {
          setShowPreview(true);
          const post = await dataProcessHelper({
            ...data,
            ...{
              major,
              schoolYear,
              userName,
              userEmail,
              userPhone,
              userPhoto,
              userBio,
            },
          });
          dispatch(hidePost());
          setPreviewData(post);
          return true;
        }}
        title="Make A Post"
        initialStore={initialStore}
        schemas={schemas}
        pageNavigationIcons={[
          MPIcons.Amenity,
          MPIcons.Bed,
          MPIcons.Calendar,
          MPIcons.Dollar,
          MPIcons.Amenity,
          MPIcons.Search,
          MPIcons.Photo,
          MPIcons.Text,
        ]}
        customModifierFuncs={[
          zodRoomCapacityGroupSet,
          zodAmenityGroupSet,
          zodAvailabilityGroupSet,
        ]}
        externalFunction={(updatedStore) => setInitialStore(updatedStore)}
        lastButtonText="Preview"
        cleanUpReset={cleanUp}
      >
        <Page1 />
        <Page2 />
        <Page3 />
        <Page4 />
        <Page5 />
        <Page6 />
        <Page7 />
        <Page8 />
      </WizardForm>
    </>
  );
};
export default MakeAPost;
