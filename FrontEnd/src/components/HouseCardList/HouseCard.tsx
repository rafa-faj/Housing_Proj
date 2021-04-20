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

  return (
    <Card className={styles.card}>
      <Card.Body className="p-0">
        <Container>
          <Row className={styles.pic}>
            <SlideShow
              images={slideShowItems}
              onImageClick={() => routeToHouseProfile(roomId)}
            />
          </Row>

          {/* 1st row */}
          <Row className="px-2">
            <Col md={6} className="price-related-large-text">
              <Row>
                {negotiable && '~'}${pricePerMonth}
              </Row>
            </Col>
            <Col md={6} className="pt-2">
              <Row>
                <div className="w-100 text-right secondary-text">
                  {formatRoomType(roomType)}
                  <span className={styles.divider}> | </span>{' '}
                  {`${numBeds} B ${numBaths} Ba`}
                </div>
              </Row>
            </Col>
          </Row>

          {/* 2nd row */}
          <Row className="px-2">
            <Col md={6}>
              <Row className="address-related-text">
                <b>~ {distance}</b>&nbsp;transit
              </Row>
            </Col>
            <Col md={6}>
              <Row>
                <div className="w-100 text-right secondary-text text-truncate">
                  Move in {formattedMoveIn}
                </div>
              </Row>
            </Col>
          </Row>

          {/* 3rd row */}
          <Row className="px-2">
            <Col md={6} className="address-related-text">
              {/* {distance} To Price Center */}
              {/* <Row>{distance}</Row> */}
              <Row>To Price Center</Row>
            </Col>

            <Col md={6} className="secondary-text">
              <Row>
                <div className="w-100 text-right text-truncate">{address}</div>
              </Row>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default HouseCard;
