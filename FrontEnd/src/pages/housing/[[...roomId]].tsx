import React, { useEffect, useState, FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { showLogin } from '@redux';
import NewUserSetup from '@components/NewUserSetup';
import SideBarLayout, { SideBar } from '@components/SideBarLayout';
import Filter from '@components/Filter';
import HouseCardList from '@components/HouseCardList';
import HouseSideBar from '@components/HouseSideBar';
import HousingPost from '@components/HousingPostForm';
import { useRouter } from 'next/router';
import HouseProfile from '@components/HouseProfile';
import styles from './[[...roomId]].module.scss';
import { isString } from '@utils';

// parses the query parameter into a number (or undefined)
const parseQueryParam = (params?: string | string[]) => {
  let roomIdString;
  if (isString(params)) {
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

  const [showHousingPost, setShowHousingPost] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<number | undefined>();

  // Before the router is ready, we cannot access query parameters.
  // So only set the room id once router is ready.
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
      <NewUserSetup />

      {roomId && (
        <HouseProfile show={true} roomId={roomId} onExit={routeToHousing} />
      )}

      {/* The actual home page */}
      <SideBarLayout>
        <div className={styles.filter}>
          <Filter />
        </div>

        <div>
          <HouseCardList />
        </div>

        <SideBar>
          <HouseSideBar
            onLoginClick={() => dispatch(showLogin())}
            onPostClick={() => setShowHousingPost(true)}
          />
        </SideBar>
      </SideBarLayout>
    </>
  );
};

export default Housing;
