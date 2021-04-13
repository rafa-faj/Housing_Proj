import React, { FunctionComponent } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from 'react-redux';
import { loading } from '@icons';
import HouseNotFound from '../HouseNotFound/HouseNotFound';
import HouseCard from './HouseCard';
import { selectHousingSearchMode, HousingMode } from '@redux';
import { useRecentRoomIds } from '@hooks';

const HouseCardList: FunctionComponent = () => {
  const { data: roomIds, error } = useRecentRoomIds();
  const searchMode = useSelector(selectHousingSearchMode);
  const dispatch = useDispatch();

  if (error) {
    return <div>Error occurred. Please reload the page.</div>; // TODO use a popup instead...
  }

  if (!roomIds) {
    return <img className="w-100 h-100" src={loading} alt="loading..." />;
  }

  return (
    <Container fluid>
      <Row>
        {roomIds.map((roomId) => (
          <Col
            xs={12}
            md={10}
            lg={6}
            key={JSON.stringify(roomId)}
            className="mb-5"
          >
            <HouseCard roomId={roomId} />
          </Col>
        ))}

        {/* {searchMode === HousingMode.FINISHED ? ( // TODO handle user searches... (might need to do it in the URL somehow)
          <HouseNotFound />
        ) : (
          <img className="w-100 h-100" src={loading.loading} alt="loading..." />
        )} */}
      </Row>
    </Container>
  );
};

export default HouseCardList;
