import React, { FunctionComponent } from 'react';
import { useLandlordRoomData } from '@hooks';
import GeneralInfo from './GeneralInfo/GenerlInfo';
import PlaceDetails from './PlaceDetails/PlaceDetails';
import ApplicationDetails from './ApplicationDetails/ApplicationDetails';

interface HouseProfileProps {
  roomId: number;
}

const HouseProfile: FunctionComponent<HouseProfileProps> = ({ roomId }) => {
  const { data, error } = useLandlordRoomData(roomId);

  if (error) {
    return <div>Error occurred!</div>; // TODO handle error in a different way
  }

  if (!data) {
    return <div>Loading...</div>; // TODO add a loader
  }

  const {
    name,
    address,
    distance,
    rent,
    roomType,
    availability,
    leaseTerm,
    petPolicy,
    parking,
    utilityDetails,
    facility,
    applicationFee,
    holdingPeriod,
    holdingDeposit,
    housingDeposit,
    verification,
    proofOfIncome,
    images,
  } = data;

  const slideShowItems = images?.map((url) => ({
    src: url,
    alt: `${name} , ${address}}`,
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
