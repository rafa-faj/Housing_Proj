import React, { FunctionComponent } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { loading } from '@icons';
import HouseNotFound from '../HouseNotFound/HouseNotFound';
import HouseCard from './HouseCard';
import { useHousingMode, HousingMode, useFilterData } from '@redux';
import { useLandlordRoomIds, useRoomSearch } from '@hooks';

const HouseCardListUI: FunctionComponent<{ roomIds: number[] }> = ({
  roomIds,
}) => {
  return (
    <Container fluid>
      <Row>
        {roomIds.map((roomId) => (
          <Col xs={12} md={10} lg={6} key={roomId} className="mb-5">
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

const FilteredList: FunctionComponent = () => {
  const filterData = useFilterData();

  // we know filterData is not undefined since the housing mode is checked in HouseCardList
  const { data: roomIds, error } = useRoomSearch(filterData!);

  if (error || roomIds?.length === 0) return <HouseNotFound />;

  if (!roomIds) {
    return <img className="w-100 h-100" src={loading} alt="loading..." />;
  }

  return <HouseCardListUI roomIds={roomIds} />;
};

const HouseCardList: FunctionComponent = () => {
  const housingMode = useHousingMode();

  return housingMode === HousingMode.Filter ? (
    <FilteredList />
  ) : (
    <BrowsingList />
  );
};

export default HouseCardList;
