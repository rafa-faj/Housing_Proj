import React, { FunctionComponent } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useScrollDirection } from '@hooks';
import styles from './StickyBar.module.scss';

const StickyBar: FunctionComponent = ({ children }) => {
  const scrollDirection = useScrollDirection();

  return (
    <Row className={styles.wrapperRow}>
      <Col md={{ offset: 1, span: 10 }} className={styles.bar}>
        {scrollDirection === 'up' ? children : undefined}
      </Col>
    </Row>
  );
};

export default StickyBar;
