import React, { FunctionComponent } from 'react';
import { useShowNewUserPopup } from '@redux';
import NewUserSetup from '@components/NewUserSetup';
import Filter from '@components/Filter';
import HouseCardList from '@components/HouseCardList';
import styles from './HouseBrowsing.module.scss';

const Housing: FunctionComponent = () => {
  const showNewUserPopup = useShowNewUserPopup();

  return (
    <>
      {/* TODO not currently used in this version... <HousingPost show={showHousingPost} setShow={setShowHousingPost} /> */}

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
