import React, { FunctionComponent } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SlideShow, SlideShowItem, Link, Body1 } from '@basics';
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
        <miscIcons.RoundArrow /> 1 day ago
      </div>
      <div className={styles.name}>{name}</div>
      <Body1 className={styles.distance}>
        <miscIcons.busIcon /> ~ {distance} to{' '}
        <Link
          className={styles.priceCenterLink}
          href="https://www.google.com/maps/place/Price+Center,+La+Jolla,+CA+92093/@32.8797205,-117.2383839,17z/data=!3m1!4b1!4m5!3m4!1s0x80dc06c46a524fb9:0x68571efb243bc289!8m2!3d32.8797205!4d-117.2361952"
          external
        >
          Price Center
        </Link>
      </Body1>
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
    <Container className={styles.container}>
      <Row>
        <Col md={7}>
          <SlideShow images={images} showPreview className={styles.pic} />
        </Col>

        <Col md={5}>{textCol}</Col>
      </Row>
    </Container>
  );
};

export default GeneralInfo;
