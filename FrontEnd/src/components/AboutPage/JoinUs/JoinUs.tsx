import React, { FunctionComponent } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './JoinUs.module.scss';
import { Button } from '@basics';

const JoinUs: FunctionComponent = () => (
  <>
    <div>If you're interested in joining us...</div>

    <div>
      Homehub is always looking for talented individuals with a passion for
      serving the collegiate community. If you think you’d be a great addition
      to our team, click below and our hiring team will reachout for a follow up
      with you shortly.
    </div>

    <div>
      <Button>Contact Us</Button>
    </div>
  </>
);

export default JoinUs;
