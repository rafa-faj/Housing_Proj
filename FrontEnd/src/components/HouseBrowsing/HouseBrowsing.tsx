import React, { FunctionComponent } from 'react';
import { useShowNewUserPopup } from '@redux';
import NewUserSetup from '@components/NewUserSetup';
import Filter from '@components/Filter';
import HouseCardList from '@components/HouseCardList';
import styles from './HouseBrowsing.module.scss';

const Housing: FunctionComponent = () => {
  
  return (
    <>
      {/* TODO not currently used in this version... <HousingPost show={showHousingPost} setShow={setShowHousingPost} /> */}


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
