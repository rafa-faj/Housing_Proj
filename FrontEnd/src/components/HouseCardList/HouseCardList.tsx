import React, { FunctionComponent } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { loading } from '@icons';
import HouseCard from './HouseCard';
import { useLandlordRoomIds } from '@hooks';
import styles from './HouseCardList.module.scss';

const HouseCardListUI: FunctionComponent<{ roomIds: number[] }> = ({
  roomIds,
}) => {
  return (
    <Container fluid className="px-md-0">
      <Row className={styles.cardRow}>
        {roomIds.map((roomId) => (
          <Col xs={12} lg={6} key={roomId} className="mb-5">
            <HouseCard roomId={roomId} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

const BrowsingList: FunctionComponent = () => {
  const { data: roomIds, error } = useLandlordRoomIds();

  if (error) {
    return <div>Error occurred. Please reload the page.</div>; // TODO use a popup instead...
  }

  if (!roomIds) {
    return <img className="w-100 h-100" src={loading} alt="loading..." />;
  }

  return <HouseCardListUI roomIds={roomIds} />;
};

export default BrowsingList;
