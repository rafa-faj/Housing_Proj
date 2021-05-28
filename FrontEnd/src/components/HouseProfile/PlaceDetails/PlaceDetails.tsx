import React, { FunctionComponent } from 'react';
import Contact from './Contact/Contact';
import styles from './PlaceDetails.module.scss';
import { useLandlordRoomData } from '@hooks';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useBreakpoints from 'use-window-width-breakpoints';
import { Subtitle2, Body2, Amenities, Link } from '@basics';
import SectionTitle from '../SectionTitle/SectionTitle';

interface PlaceDetailsProps {
  roomId: number;
}

const PlaceDetails: FunctionComponent<PlaceDetailsProps> = ({ roomId }) => {
  const { data, error } = useLandlordRoomData(roomId);
  const breakpoint = useBreakpoints();

  if (error) {
    return <div>Error occurred!</div>; // TODO handle error in a different way
  }

  if (!data) {
    return <div>Loading Place Details...</div>; // TODO add a loader
  }

  const {
    rent,
    roomType,
    availability,
    leaseTerm,
    petPolicy,
    parking,
    utilityDetails,
    facility,
    website,
  } = data;

  // Used in RentAndHouseDetails to display information with labels
  const details = {
    Availability: (
      <span>
        The apartment is available <b>{availability}</b>
      </span>
    ),
    'Lease Term': leaseTerm,
    'Pet Policy': <div className={styles.detailFormat}>{petPolicy}</div>,
    Parking: parking,
  };

  // Changes details specified above into appropriate text + columns
  const RentAndHouseDetails: FunctionComponent = () => (
    <Row className={styles.detailTileWrapper}>
      {Object.entries(details).map(([label, value]) => (
        <Col xs={12} sm={6} md={12} lg={6}>
          <Subtitle2>{label}</Subtitle2>
          <Body2>{value}</Body2>
        </Col>
      ))}
    </Row>
  );

  // TODO
  // use {utilityDetails} inside here
  const InfoThing = () => <div />;

  const UtilityDetails: FunctionComponent = () => (
    <Col className={styles.utilityTile}>
      <div>
        <Subtitle2>
          Utility Details <InfoThing />
        </Subtitle2>
        <Body2>All paid separately</Body2>
      </div>
    </Col>
  );

  const amenityColConfigurations = {
    sm: 6,
    md: 4,
    lg: 3,
    xl: 2,
  };

  const AmenitiesSection: FunctionComponent = () => (
    <Row className={styles.amenitiesWrapper}>
      <Subtitle2>Amenities</Subtitle2>

      <Container>
        <Body2>
          <Row>
            <Amenities
              selected={facility}
              {...amenityColConfigurations}
              className={styles.amenities}
              colClassName={styles.amenity}
              extraContent={
                <Link href={website} external>
                  More on website
                </Link>
              }
              useCol
            />
          </Row>
        </Body2>
      </Container>
    </Row>
  );

  return (
    <Container>
      <Row>
        <Col xs={12} md={8} className="pr-md-3">
          <SectionTitle>About the Place</SectionTitle>

          <h5>
            <Row className={styles.greenBackground}>
              <Col xs={6}>Starting at {rent}</Col>
              <Col xs={6}>{roomType}</Col>
            </Row>
          </h5>

          <RentAndHouseDetails />
        </Col>

        {breakpoint.down.md && <AmenitiesSection />}

        <Col xs={12} lg={4} className="pl-md-3">
          {breakpoint.up.lg ? (
            <>
              <Contact roomId={roomId} />
              <UtilityDetails />
            </>
          ) : (
            <>
              <UtilityDetails />
              <Contact roomId={roomId} />
            </>
          )}
        </Col>
      </Row>

      {breakpoint.up.lg && <AmenitiesSection />}
    </Container>
  );
};

export default PlaceDetails;
