import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectShowNewUserPopup, showLogin } from '../redux/slices/auth';
import HouseCardList from './HouseCardList';
import Filter from './Filter';
import HousingPost from './HousingPostForm';
import NewUserSetup from './NewUserSetup';
import HouseSideBar from './HouseSideBar';
import SideBarLayout, { SideBar } from './SideBarLayout';

const Home: React.FC = () => {
  const showNewUserPopup = useSelector(selectShowNewUserPopup);

  const [showHousingPost, setShowHousingPost] = useState<boolean>(false);

  return (
    <>
      <HousingPost show={showHousingPost} setShow={setShowHousingPost} />

      {showNewUserPopup !== undefined && ( // only render the modal when user info exists, to initialize the wizard form with the user info
        <NewUserSetup
          show={showNewUserPopup !== undefined}
          name={showNewUserPopup?.name}
          email={showNewUserPopup?.email}
        />
      )}

      {/* The actual home page */}
      <SideBarLayout>
        <div className="home-filter">
          <Filter />
        </div>

        <div>
          <HouseCardList />
        </div>

        <SideBar>
          <HouseSideBar
            onLoginClick={showLogin}
            onPostClick={() => setShowHousingPost(true)}
          />
        </SideBar>
      </SideBarLayout>
    </>
  );
};

export default Home;
