import React, { FunctionComponent } from 'react';
import Contact from './Contact/Contact';
import styles from '. PlaceDetails.module.scss';

interface PlaceDetailsProps {}

const PlaceDetails: FunctionComponent<PlaceDetailsProps> = ({}) => {
  return (
    <>
      <Contact />
    </>
  );
};

export default PlaceDetails;
