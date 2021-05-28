import React, { FunctionComponent } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { HousePostUIData } from '../../../models/PostModels';
import { largeAmenitiesIcons, miscIcons } from '@icons';
import styles from './SecondColumn.module.scss';
import cn from 'classnames';

const Ellipse: FunctionComponent = () => (
  <Row className="justify-content-center">
    {[0, 1, 2].map((x) => (
      <miscIcons.ellipse key={x} className="m-3" />
    ))}
  </Row>
);

export const facilityToIcon = {
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

const GetIcon: FunctionComponent<{
  str: keyof typeof facilityToIcon;
  useStroke?: boolean;
}> = ({ str, useStroke }) => (
  <div className={cn(styles.icon, { [styles.useStroke]: useStroke })}>
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

const SecondColumn: FunctionComponent<Props> = ({
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
    <Container className={styles.container}>
      <Row className={styles.houseTypeWrapper}>
        <span className={styles.houseType}>{name}</span>
      </Row>

      <Row>
        <Col className={styles.priceWrapper} md={5}>
          <Row>
            {negotiable && '~'}${pricePerMonth}
          </Row>
          <Row className={styles.priceLabel}>Rent/month</Row>
        </Col>
        <Col md={{ span: 5, offset: 2 }}>
          <Row className={styles.subtitle}>Room type</Row>
          <Row className={styles.primary}>{roomType}</Row>
        </Col>
      </Row>

      <Row className={styles.justifyCenter}>
        <Col md={5}>
          <Row className={styles.subtitle}>Move in time</Row>
          <Row className={styles.primary}>{formattedMoveIn}</Row>
        </Col>

        <Col md={{ span: 5, offset: 2 }}>
          <Row className={styles.subtitle}>Stay period</Row>
          <Row className={styles.primary}>{stayPeriod} months</Row>
        </Col>
      </Row>

      <Ellipse />

      <Row className={styles.subtitle}>Facilities</Row>
      <Row className={styles.subtitle}>
        {facilities.map((facility) => (
          <Col
            xs={{ span: 3, offset: 1 }}
            key={facility}
            className={styles.textCenter}
          >
            <GetIcon str={facility} useStroke={facility === 'Hardwood Floor'} />
            {facility}
          </Col>
        ))}
      </Row>

      <Ellipse />

      <Row className={styles.subtitle}>Looking for</Row>
      <ul className={styles.subtitle}>
        {other.map((description) => (
          <li key={description}>{description}</li>
        ))}
      </ul>
    </Container>
  </Col>
);

export default SecondColumn;
