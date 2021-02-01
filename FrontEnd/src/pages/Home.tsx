import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectShowNewUserPopup } from '../redux/slices/auth';
import HouseCardList from '../components/HouseCardList';
import Filter from '../components/Filter';
import Login from '../components/Login';
import HousingPost from '../components/HousingPostForm';
import NewUserSetup from '../components/NewUserSetup';
import HouseSideBar from '../components/HouseSideBar';
import SideBarLayout, { SideBar } from '../components/SideBarLayout';

const Home: React.FC = () => {
  const showNewUserPopup = useSelector(selectShowNewUserPopup);

  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showHousingPost, setShowHousingPost] = useState<boolean>(false);

  return (
    <>
      {/* Modals */}
      <Login show={showLogin} handleClose={() => setShowLogin(false)} />
      <HousingPost show={showHousingPost} setShow={setShowHousingPost} />

      {showNewUserPopup !== undefined && ( // only render the modal when user info exists, to initialize the wizard form with the user info
        <NewUserSetup
          show={showNewUserPopup !== undefined}
          setShow={(value: boolean) => {
            console.log(
              'uhhh no clicking out of this form buddy! we gotta make the x look disabled in the future.',
            );
          }}
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
            onLoginClick={() => setShowLogin(true)}
            onPostClick={() => setShowHousingPost(true)}
          />
        </SideBar>
      </SideBarLayout>
    </>
  );
};

export default Home;
