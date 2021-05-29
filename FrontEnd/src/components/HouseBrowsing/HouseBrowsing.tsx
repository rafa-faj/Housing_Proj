import React, { FunctionComponent } from 'react';
import { useShowNewUserPopup } from '@redux';
import NewUserSetup from '@components/NewUserSetup';
import Filter from '@components/Filter';
import {Body2} from '@basics'
import HouseCardList from '@components/HouseCardList';
import styles from './HouseBrowsing.module.scss';
import cn from 'classnames';

const Housing: FunctionComponent = () => {
  return (
    <>
      <div className="px-md-0 pb-5 px-3">
        <Filter />
      </div>

      <div className="px-md-0 px-3 pb-3">
        <Body2>Posts are arranged by earliest to latest <b>available time</b> </Body2>
      </div>

      <div>
        <HouseCardList />
      </div>
    </>
  );
};

export default Housing;
