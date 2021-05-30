import React, { FunctionComponent } from 'react';
import Contact from './Contact/Contact';
import styles from './PlaceDetails.module.scss';
import styles_parent from '../HouseProfile.module.scss'
import { useLandlordRoomData } from '@hooks';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useBreakpoints from 'use-window-width-breakpoints';
import { Subtitle2, Body2, Amenities, Link } from '@basics';
import SectionTitle from '../SectionTitle/SectionTitle';
import cn from 'classnames';

interface PlaceDetailsProps {
  roomId: number;
}

interface ColSpanConfig{
  xs: number;
  sm: number;
  md: number;
  lg: number;
}

interface RentAndHouseDetailsKeys{
  Availability: HTMLElement;
  'Lease Term': string;
  'Pet Policy': HTMLElement;
  Parking: string;
  'Utility Details':string;
}

interface RentAndHouseDetailsProps extends ColSpanConfig{
  details: RentAndHouseDetailsKeys;
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
  const detailsInCol = {
    Availability: (
      <span>
        The apartment is available <b>{availability}</b>
      </span>
    ),
    'Lease Term': leaseTerm
  };
  const detailsInColColConfigurations = {
    xs: 12,
    sm: 6,
    md: 12,
    lg: 6,
  };

  const detailsInRow = {
    'Pet Policy': <div className={styles.detailFormat}>{petPolicy}</div>,
    Parking: parking,
    'Utility Details':'All paid separately'
  }

  const detailsInRowColConfigurations = {
    xs: 12,
    sm: 4,
    md: 12,
    lg: 4,
  };

  // Changes details specified above into appropriate text + columns
  const RentAndHouseDetails: FunctionComponent<RentAndHouseDetailsProps> = ({details, xs, sm, md, lg}) => (
    <Row className={styles.detailTileWrapper}>
      {Object.entries(details).map(([label, value]) => (
        <Col xs={xs} sm={sm} md={md} lg={lg}>
          <Subtitle2>{label}</Subtitle2>
          <Body2>{value}</Body2>
        </Col>
      ))}
    </Row>
  )

  // TODO
  // use {utilityDetails} inside here
  const InfoThing = () => <div />;

  const amenityColConfigurations = {
    sm: 6,
    md: 4,
    lg: 3,
    xl: 4,
  };

  const AmenitiesSection: FunctionComponent = () => (
    <Row className={styles.amenitiesWrapper}>
      <Subtitle2>Amenities</Subtitle2>

      <Container className={styles_parent.container}>
        <Row>
          <Col xs={9}>
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
          </Col>
        </Row>
      </Container>
    </Row>
  );

  return (
    <Container className={styles_parent.container}>
      <Row>
        <Col xs={12} lg={8} className="pr-md-3">
          <SectionTitle>About the Place</SectionTitle>

          <h5>
            <Row className={styles.greenBackground}>
              <Col xs={6}>Starting at {rent}</Col>
              <Col xs={6}>{roomType}</Col>
            </Row>
          </h5>

          <RentAndHouseDetails details={detailsInCol} {...detailsInColColConfigurations}/>
        </Col>

        {breakpoint.down.md && <AmenitiesSection />}

        <Col xs={12} lg={4} className={cn(styles.ColWrapper, "pl-md-3 order-first order-lg-last")}>
          <Contact roomId={roomId} />
        </Col>
      </Row>
      <RentAndHouseDetails details={detailsInRow} {...detailsInRowColConfigurations}/>

      {breakpoint.up.lg && <AmenitiesSection />}
    </Container>
  );
};

export default PlaceDetails;
