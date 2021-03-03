import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { HousePostUIData } from '../../models/PostModels';
import { largeAmenitiesIcons, miscIcons } from '../../assets/icons/all';

const Ellipse: React.FC<{}> = () => (
  <Row className="justify-content-center">
    <miscIcons.ellipse className="m-3" />
    <miscIcons.ellipse className="m-3" />
    <miscIcons.ellipse className="m-3" />
  </Row>
);

export const facilityToIcon = {
  // Parking: <facilityIcons.parking />,
  // Elevator: <facilityIcons.elevator />,
  // 'Gym room': <facilityIcons.gym />,
  // 'Swimming pool': <facilityIcons.swimmingPool />,
  // 'Pets friendly': <facilityIcons.petsFriendly />,
  // 'Indoor washer': <facilityIcons.indoorWasher />,

  // TODO need to edit above icons in new format and make actual icons for the below ones
  'Pets Friendly': <largeAmenitiesIcons.petsFriendly />,
  'Common Area': <largeAmenitiesIcons.sharedCommonSpace />,
  Furnished: <largeAmenitiesIcons.furnished />,
  'A/C': <largeAmenitiesIcons.airConditioning />,
  'No Smoking': <largeAmenitiesIcons.smokeFree />,
  'Indoor Laundry': <largeAmenitiesIcons.indoorWasher />,
  'Outdoor Parking': <largeAmenitiesIcons.outdoorParking />,
  'Indoor Parking': <largeAmenitiesIcons.indoorParking />,
  'Swimming Pool': <largeAmenitiesIcons.swimmingPool />,
  'Hardwood Floor': <largeAmenitiesIcons.hardwoodFloor />,
  Elevator: <largeAmenitiesIcons.elevator />,
  Gym: <largeAmenitiesIcons.gym />,
};

const GetIcon: React.FC<{
  str: keyof typeof facilityToIcon;
  useStroke?: boolean;
}> = ({ str, useStroke }) => (
  <div
    className={`mt-2 ${
      useStroke
        ? 'house-profile-amenity-icon-use-stroke'
        : 'house-profile-amenity-icon'
    } `}
  >
    {facilityToIcon[str]}
  </div>
);

type Props = Pick<
  HousePostUIData,
  | 'name'
  | 'negotiable'
  | 'pricePerMonth'
  | 'roomType'
  | 'stayPeriod'
  | 'facilities'
  | 'formattedMoveIn'
  | 'other'
>;

const SecondColumn: React.FC<Props> = ({
  name,
  negotiable,
  pricePerMonth,
  roomType,
  stayPeriod,
  facilities,
  formattedMoveIn,
  other,
}) => (
  <Col sm={12} md={6} lg={4}>
    <Container className="d-flex flex-column justify-content-around mx-3 mx-lg-0 h-100">
      <Row className="justify-content-left flex-grow-0">
        <span className="housing-profile-house-type">{name}</span>
      </Row>

      <Row>
        <Col className="housing-profile-price" md={5}>
          <Row>
            {negotiable && '~'}${pricePerMonth}
          </Row>
          <Row className="profile-text-price-related">Rent/month</Row>
        </Col>
        <Col md={{ span: 5, offset: 2 }}>
          <Row className="subtitle-text">Room type</Row>
          <Row className="primary-text">{roomType}</Row>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={5}>
          <Row className="subtitle-text">Move in time</Row>
          <Row className="primary-text">{formattedMoveIn}</Row>
        </Col>

        <Col md={{ span: 5, offset: 2 }}>
          <Row className="subtitle-text">Stay period</Row>
          <Row className="primary-text">{stayPeriod} months</Row>
        </Col>
      </Row>

      <Ellipse />

      <Row className="subtitle-text">Facilities</Row>
      <Row className="subtitle-text">
        {facilities.map((facility) => (
          <Col
            xs={{ span: 3, offset: 1 }}
            key={facility}
            className="text-center"
          >
            <GetIcon str={facility} useStroke={facility === 'Hardwood Floor'} />
            {facility}
          </Col>
        ))}
      </Row>

      <Ellipse />

      <Row className="subtitle-text">Looking for</Row>
      <ul className="primary-text">
        {other.map((description) => (
          <li key={description}>{description}</li>
        ))}
      </ul>
    </Container>
  </Col>
);

export default SecondColumn;
