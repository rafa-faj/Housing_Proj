import React from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import FilterForm from './FilterForm/FilterForm';
import { filterIcons } from '@icons';
import { selectShowFilter, setShow } from '@redux';
import styles from './Filter.module.scss';

const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const showFilter = useSelector(selectShowFilter);
  const setShowFilter = (value: boolean) => dispatch(setShow(value));

  return (
    <>
      {/* Header in the home page */}
      <div className={`${styles.filter} px-lg-5 px-md-4`}>
        <filterIcons.hello className="d-none d-md-flex" />
        <filterIcons.arrow className="d-none d-md-flex" />
        <Button onClick={() => setShowFilter(true)}>Find your place</Button>
        <filterIcons.arrow className="d-none d-md-flex" />
        <filterIcons.loveHouse className="d-none d-md-flex" />
      </div>

      {/* The filter itself */}
      <FilterForm show={showFilter} setShow={setShowFilter} />
    </>
  );
};

export default Filter;
