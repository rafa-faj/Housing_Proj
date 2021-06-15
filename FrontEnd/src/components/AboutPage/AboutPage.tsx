import React, { FunctionComponent } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './AboutPage.module.scss';
import { RemoveLayoutMargin } from '@components';
import WhyWeStartedHomehub from './WhyWeStartedHomehub/WhyWeStartedHomehub';
import MeetTheTeam from './MeetTheTeam/MeetTheTeam';
import HomehubPlan from './HomehubPlan/HomehubPlan';
import JoinUs from './JoinUs/JoinUs';

const AboutPage: FunctionComponent = () => (
  <RemoveLayoutMargin direction="horizontal">
    <WhyWeStartedHomehub />

    <MeetTheTeam />

    <HomehubPlan />

    <JoinUs />
  </RemoveLayoutMargin>
);

export default AboutPage;
