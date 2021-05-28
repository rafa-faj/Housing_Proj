import React, { FunctionComponent } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { SlideShow } from '@basics';
import { formatRoomType, formatHouseCardRent } from '@utils';
import { useLandlordRoomData } from '@hooks';
import { isRunningDev } from '@utils';
import styles from './HouseCard.module.scss';
import { miscIcons } from '@icons';
import { PRODUCTION_BASE_URL, DEV_BASE_URL } from '@constants';

interface Props {
  roomId: number;
}

const HouseCard: FunctionComponent<Props> = ({ roomId }) => {
  const { data, error } = useLandlordRoomData(roomId);

  if (error) {
    return <div>Error occurred!</div>; // TODO handle error in a different way
  }

  if (!data) {
    return <div>Loading...</div>; // TODO add a loader
  }

  const routeToHouseProfile = (id: number) => {
    window.open(`/housing/${id}`, '_ blank')
  };

  const {
    name,
    address,
    distance,
    rent,
    roomType,
    availability,
    images,
  } = data;

  const formattedRent = formatHouseCardRent(rent);
  const slideShowItems = images?.map((url) => ({
    src: url,
    alt: `${name} , ${address}}`,
  }));

  const textCol = (
    <Col
      md={5}
      className={styles.secondCol}
      onClick={() => routeToHouseProfile(roomId)}
    >
      <div className={styles.textPortion}>
        <div className={styles.day}>
          <miscIcons.RoundArrow /> 1 days ago
        </div>

        <div className={styles.price}>
          <b>{formattedRent}+ /mo</b>
        </div>

        <div className={styles.distance}>
          <miscIcons.busIcon /> <b>~ {distance} transit</b>&nbsp;
        </div>

        <div className={styles.address}>
          <div className={styles.locationIcon}>
            <miscIcons.LocationIcon />
          </div>
          <div>{address}</div>
        </div>

        <div className={styles.room}>{roomType}</div>

        <div className={styles.date}>Available {availability}</div>
      </div>
    </Col>
  );

  return (
    <Card className={styles.card}>
      <Card.Body className="p-0">
        <Container className={styles.container}>
          <Row>
            <Col md={7} className={styles.pic}>
              <SlideShow
                images={slideShowItems}
                onImageClick={() => routeToHouseProfile(roomId)}
              />
            </Col>
            {textCol}
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default HouseCard;
