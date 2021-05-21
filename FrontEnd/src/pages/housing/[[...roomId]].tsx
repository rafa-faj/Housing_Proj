import React, { useEffect, useState, FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { useShowNewUserPopup, showLogin } from '@redux';
import NewUserSetup from '@components/NewUserSetup';
import Filter from '@components/Filter';
import HouseCardList from '@components/HouseCardList';
import HousingPost from '@components/HousingPostForm';
import { useRouter } from 'next/router';
import HouseProfile from '@components/HouseProfile';
import styles from './[[...roomId]].module.scss';

// parses the query parameter into a number (or undefined)
const parseQueryParam = (params?: string | string[]) => {
  let roomIdString;
  if (typeof params === 'string') {
    roomIdString = params;
  } else {
    roomIdString = params ? params[0] : '';
  }

  const roomId = parseInt(roomIdString);
  return isNaN(roomId) ? undefined : roomId;
};

const Housing: FunctionComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const showNewUserPopup = useShowNewUserPopup();
  const [showHousingPost, setShowHousingPost] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<number | undefined>();

  useEffect(() => {
    if (!router.isReady) return;

    const roomId = parseQueryParam(router.query.roomId);
    setRoomId(roomId);
  }, [router]);

  const routeToHousing = () => {
    router.push('/housing', undefined, { shallow: true });
  };

  return (
    <>
      <HousingPost show={showHousingPost} setShow={setShowHousingPost} />
      {roomId && (
        <HouseProfile show={true} roomId={roomId} onExit={routeToHousing} />
      )}

      {showNewUserPopup !== undefined && ( // only render the modal when user info exists, to initialize the wizard form with the user info
        <NewUserSetup
          show={showNewUserPopup !== undefined}
          name={showNewUserPopup?.name}
          email={showNewUserPopup?.email}
        />
      )}

      <div className={styles.filter}>
        <Filter />
      </div>

      <div>
        <HouseCardList />
      </div>
    </>
  );
};

export default Housing;
