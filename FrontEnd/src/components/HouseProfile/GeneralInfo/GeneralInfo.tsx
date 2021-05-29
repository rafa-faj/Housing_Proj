import React, { FunctionComponent } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SlideShow, SlideShowItem } from '@basics';
import GoogleMap from '@basics/Map';
import { miscIcons } from '@icons';
import styles from './GeneralInfo.module.scss';

interface GeneralInfoProps {
  images: SlideShowItem[];
  address: string;
  distance: string;
  name: string;
}

const GeneralInfo: FunctionComponent<GeneralInfoProps> = ({
  images,
  address,
  distance,
  name,
}) => {
  const textCol = (
    <div className={styles.textPortion}>
      <div className={styles.day}>
        <miscIcons.RoundArrow /> 1 days ago
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.distance}>
        <miscIcons.busIcon /> <b>~ {distance} transit</b>&nbsp;
      </div>
      <div className={styles.address}>
        <div className={styles.locationIcon}>
          <miscIcons.LocationIcon />
        </div>
        <div> {address} </div>
      </div>
      <GoogleMap address={address} className={styles.map} />
    </div>
  );
  return (
    <>
      <Container className={styles.container}>
        <Row>
          <Col md={7}>
            <SlideShow images={images} showPreview className={styles.pic} />
          </Col>

          <Col md={5}>{textCol}</Col>
        </Row>
      </Container>
    </>
  );
};

export default GeneralInfo;
