import React, { FunctionComponent } from 'react';
import { useRoomData } from '@hooks';
import GeneralInfo from './GeneralInfo/GenerlInfo';
import PlaceDetails from './PlaceDetails/PlaceDetails';
import ApplicationDetails from './ApplicationDetails/ApplicationDetails';
import styles from './HouseProfile.module.scss';

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

  const { leaserEmail, address, photos, name, distance } = data;

  const slideShowItems = photos.map((url) => ({
    src: url,
    alt: `${leaserEmail} , ${address}}`,
  }));

  return (
    <div>
      <div className={styles.section}>
        <GeneralInfo
          images={slideShowItems}
          address={address}
          distance={distance}
          name={name}
        />
      </div>

      <div className={styles.section}>
        <PlaceDetails roomId={roomId} />
      </div>

      <ApplicationDetails roomId={roomId} />
    </div>
  );
};

export default HouseProfile;
