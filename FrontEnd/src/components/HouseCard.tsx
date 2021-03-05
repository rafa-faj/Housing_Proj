import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import SlideShow, { SlideShowItem } from './basics/SlideShow/index';
import { formatRoomType } from '../utils';
import useRoomData from '../hooks/swr/useRoomData';
import useRemotePhotos from '../hooks/photos/useRemotePhotos';
import { useRouter } from 'next/dist/client/router';

interface Props {
  roomId: number;
}

const HouseCard: React.FC<Props> = ({ roomId }) => {
  const { data, error } = useRoomData(roomId);

  if (error) {
    return <div>Error occurred!</div>; // TODO handle error in a different way
  }

  if (!data) {
    return <div>Loading...</div>; // TODO add a loader
  }

  const {
    leaserEmail,
    location,
    photos: unconvertedPhotos,
    numBaths,
    numBeds,
    formattedMoveIn,
    negotiable,
    pricePerMonth,
    roomType,
    distance,
  } = data;

  const photos = useRemotePhotos(unconvertedPhotos);
  const [slideShowItems, setSlideShowItems] = useState<SlideShowItem[]>([]);
  const router = useRouter();

  // set the slide show items
  useEffect(() => {
    setSlideShowItems(
      photos.map((url) => ({
        src: url,
        alt: `${leaserEmail} , ${location}}`,
      })),
    );
  }, [setSlideShowItems, photos, leaserEmail, location]);

  return (
    <>
      <Card className="house-card">
        <Card.Body className="p-0">
          <Container>
            <Row className="house-pic">
              <SlideShow
                images={slideShowItems}
                onImageClick={() => router.push(`/housing/${roomId}`)}
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
                    <span className="divider"> | </span>{' '}
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
                  <div className="w-100 text-right text-truncate">
                    {location}
                  </div>
                </Row>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};

export default HouseCard;
