import React, { FunctionComponent } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './JoinUs.module.scss';
import { Button, Body2 } from '@basics';

const JoinUs: FunctionComponent = () => (
  <Container fluid className={styles.join_container}>
    <Col>
      <Row className="justify-content-center align-content-center mb-3">
        <h3 className={styles.join_title}>If you're interested in joining us...</h3>
      </Row>
      <Row className="justify-content-center align-content-center mb-4">
        <Body2 className={styles.join_content}>
          Homehub is always looking for talented individuals with a passion for
          serving the collegiate community. If you think you’d be a great
          addition to our team, click below and our hiring team will reach out
          for a follow up with you shortly.
        </Body2>
      </Row>
      <Row className="justify-content-center align-content-center">
        <div>
          <Button>Contact Us</Button>
        </div>
      </Row>
    </Col>
  </Container>
);

export default JoinUs;
