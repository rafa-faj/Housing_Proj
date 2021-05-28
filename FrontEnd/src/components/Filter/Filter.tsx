import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { filterIcons } from '@icons';
import { setShow } from '@redux';
import styles from './Filter.module.scss';

const Filter: FunctionComponent = () => {
  const dispatch = useDispatch();
  const setShowFilter = (value: boolean) => dispatch(setShow(value));

  return (
    <>
      <div className={`${styles.filter} px-lg-5 px-md-4`}>
        <filterIcons.hello className="d-none d-md-flex" />
        <filterIcons.arrow className="d-none d-md-flex" />
        <h2 className={styles.homehubOrange}>Homehub</h2>
        <filterIcons.arrow className="d-none d-md-flex" />
        <filterIcons.loveHouse className="d-none d-md-flex" />
      </div>
    </>
  );
};

export default Filter;
