import React, { useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useSelector } from 'react-redux';
import { selectShowNewUserPopup, showLogin } from '../../redux/slices/auth';
import NewUserSetup from '../../components/NewUserSetup';
import SideBarLayout, { SideBar } from '../../components/SideBarLayout';
import Filter from '../../components/Filter';
import HouseCardList from '../../components/HouseCardList';
import HouseSideBar from '../../components/HouseSideBar';
import HousingPost from '../../components/HousingPostForm';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Housing: React.FC<Props> = () => {
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

export default Housing;
