import React, { FunctionComponent } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { SlideShow } from '@basics';
import { formatRoomType } from '../../utils';
import { useRoomData } from '@hooks';
import { useRouter } from 'next/dist/client/router';
import styles from './HouseCard.module.scss';
import { miscIcons } from '@icons';

interface Props {
  roomId: number;
}

const HouseCard: FunctionComponent<Props> = ({ roomId }) => {
  const { data, error } = useRoomData(roomId);
  const router = useRouter();

  if (error) {
    return <div>Error occurred!</div>; // TODO handle error in a different way
  }

  if (!data) {
    return <div>Loading...</div>; // TODO add a loader
  }

  const routeToHouseProfile = (id: number) => {
    router.push(`/housing/${id}`, undefined, { shallow: true });
  };

  const {
    leaserEmail,
    address,
    photos,
    numBaths,
    numBeds,
    formattedMoveIn,
    negotiable,
    pricePerMonth,
    roomType,
    distance,
  } = data;

  const slideShowItems = photos.map((url) => ({
    src: url,
    alt: `${leaserEmail} , ${address}}`,
  }));

  const textCol = (
    <Col md={5} className={styles.secondCol}>
      <div className={styles.textPortion}>
        <div className={styles.day}>
          <miscIcons.RoundArrow /> 2 days ago
        </div>

        <div className={styles.price}>
          <b>$1200+/mo</b>
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

        <div className={styles.room}>
          {`${numBeds}Bed ${numBaths}Bath`}
          <span className={styles.divider}> | </span> {formatRoomType(roomType)}{' '}
          Room
        </div>

        <div className={styles.date}>
          Available from June 1, 2021{/*{formattedMoveIn}*/}
        </div>
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
