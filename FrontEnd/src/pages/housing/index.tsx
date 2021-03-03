import React from 'react';
import { InferGetServerSidePropsType } from 'next';
import { getHousingPostsAPI, getRecentHousingPosts } from '../../apis';
import { useSelector } from 'react-redux';
import { selectShowNewUserPopup } from '../../redux/slices/auth';
import NewUserSetup from '../../components/NewUserSetup';
import SideBarLayout, { SideBar } from '../../components/SideBarLayout';
import Filter from '../../components/Filter';
import HouseCardList from '../../components/HouseCardList';
import HouseSideBar from '../../components/HouseSideBar';

export const getServerSideProps = async () => {
  console.log('running');
  const data = (await getRecentHousingPosts()) || [];
  console.log('got data');

  return {
    props: { data },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Housing: React.FC<Props> = ({ data }) => {
  const showNewUserPopup = useSelector(selectShowNewUserPopup);

  return (
    <>
      {/* Modals */}
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
          // onLoginClick={() => (router.push('/login'))}
          // onPostClick={() => (router.push('/housing/post'))}
          />
        </SideBar>
      </SideBarLayout>
    </>
  );
};

export default Housing;
