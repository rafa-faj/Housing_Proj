import React, { FunctionComponent } from 'react';
import { useRoomData } from '@hooks';
import GeneralInfo from './GeneralInfo/GenerlInfo';
import PlaceDetails from './PlaceDetails/PlaceDetails';
import ApplicationDetails from './ApplicationDetails/ApplicationDetails';

interface HouseProfileProps {
  roomId: number;
}

const HouseProfile: FunctionComponent<HouseProfileProps> = ({ roomId }) => {
  const { data, error } = useRoomData(roomId);

  if (error) {
    return <div>Error occurred!</div>; // TODO handle error in a different way
  }

  if (!data) {
    return <div>Loading...</div>; // TODO add a loader
  }

  const {
    leaserEmail,
    address,
    photos,
    name,
    negotiable,
    pricePerMonth,
    roomType,
    stayPeriod,
    facilities,
    roomDescription,
    formattedMoveIn,
    other,
    distance,
    profilePhoto,
    leaserName,
    leaserSchoolYear,
    leaserMajor,
    leaserPhone,
  } = data;

  const slideShowItems = photos.map((url) => ({
    src: url,
    alt: `${leaserEmail} , ${address}}`,
  }));

  return (
    <div>
      <GeneralInfo
        images={slideShowItems}
        address={address}
        distance={distance}
        name={name}
      />

      <PlaceDetails />

      <ApplicationDetails roomId={roomId} />
    </div>
  );
};

export default HouseProfile;
