import React, { FunctionComponent } from 'react';
import Contact from './Contact/Contact';
import styles from './PlaceDetails.module.scss';
import { useLandlordRoomData } from '@hooks';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useBreakpoints from 'use-window-width-breakpoints';
import { Subtitle2, Body2 } from '@basics';
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
  } = data;

  // Used in RentAndHouseDetails to display information with labels
  const details = {
    Availability: (
      <span>
        The apartment is available <b>{availability}</b>
      </span>
    ),
    'Lease Term': leaseTerm,
    'Pet Policy': petPolicy,
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
        {/* TODO this should not be hard-coded */}
        <Body2>All paid separately</Body2>
      </div>
    </Col>
  );

  const Amenities: FunctionComponent = () => (
    <Row className={styles.amenitiesWrapper}>
      <Subtitle2>Amenities</Subtitle2>

      <Container>
        <Row>
          {/* TODO for each amenity, display 
          <Col>
            it's icon, <Body2>it's amenity</Body2> // TODO Body2 returns a div, not a span? How to handle this?
          </Col>
        */}
        </Row>
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

        <Col xs={12} md={4} className="pl-md-3">
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

      <Amenities />
    </Container>
  );
};

export default PlaceDetails;
