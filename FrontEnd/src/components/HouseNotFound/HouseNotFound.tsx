import React, { FunctionComponent } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Button } from '@basics';
import { useDispatch } from 'react-redux';
import { filterIcons } from '@icons';
import { setShow } from '@redux';
import styles from './HouseNotFound.module.scss';

const HouseNotFound: FunctionComponent = () => {
  const dispatch = useDispatch();
  const setShowFilter = (value: boolean) => dispatch(setShow(value));

  return (
    <Container>
      <Row className="justify-content-center">
        <filterIcons.notFound />
      </Row>
      <Row className="justify-content-center">
        <p className={styles.displayText}>
          Oops, it looks like nothing fits your criteria...
        </p>
      </Row>
      <Row className="justify-content-center">
        <p className={styles.displayText}>Edit your Criteria & Try again !</p>
      </Row>
      <Row className="justify-content-center">
        <Button onClick={() => setShowFilter(true)}>Edit Criteria</Button>
      </Row>
    </Container>
  );
};

export default HouseNotFound;
