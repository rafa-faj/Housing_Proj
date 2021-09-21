import React, { FunctionComponent } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { loading } from '@icons';
import { HouseCardLandLord, HouseCardStudent } from './HouseCard';
import { useLandlordRoomIds, useStudentRoomIds } from '@hooks';
import styles from './HouseCardList.module.scss';
import { useShowPostType } from '@redux';

export type postingType = 'landlord' | 'student';

const HouseCardListUI: FunctionComponent<{
  roomIds: number[];
  postType: postingType;
}> = ({ roomIds, postType }) => {
  return (
    <Container fluid className="px-md-0">
      <Row className={styles.cardRow}>
        {roomIds.map((roomId) => (
          <Col xs={12} lg={6} className="mb-5">
            {postType === 'student' ? (
              <HouseCardStudent roomId={roomId} />
            ) : (
              <HouseCardLandLord roomId={roomId} />
            )}
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export const BrowsingLandlordList: FunctionComponent = () => {
  const { data: roomIds, error } = useLandlordRoomIds();
  if (error) {
    return <div>Error occurred. Please reload the page.</div>; // TODO use a popup instead...
  }

  if (!roomIds) {
    return <img className="w-100 h-100" src={loading} alt="loading..." />;
  }

  return <HouseCardListUI roomIds={roomIds} postType="landlord" />;
};

export const BrowsingStudentList: FunctionComponent = () => {
  const { data: roomIds, error } = useStudentRoomIds();
  if (error) {
    return <div>Error occurred. Please reload the page.</div>; // TODO use a popup instead...
  }

  if (!roomIds) {
    return <img className="w-100 h-100" src={loading} alt="loading..." />;
  }

  return <HouseCardListUI roomIds={roomIds} postType="student" />;
};

const BrowsingList: FunctionComponent<{ postType: postingType }> = ({
  postType,
}) => {
  return (
    <>
      {postType === 'student' ? (
        <BrowsingStudentList />
      ) : (
        <BrowsingLandlordList />
      )}
    </>
  );
};

export default BrowsingList;
