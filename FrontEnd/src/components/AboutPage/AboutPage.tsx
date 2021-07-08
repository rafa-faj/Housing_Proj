import React, { FunctionComponent } from 'react';
import { RemoveLayoutMargin } from '@components';
import styles from './AboutPage.module.scss';
import WhyWeStartedHomehub from './WhyWeStartedHomehub/WhyWeStartedHomehub';
import MeetTheTeam from './MeetTheTeam/MeetTheTeam';
import HomehubPlan from './HomehubPlan/HomehubPlan';
import JoinUs from './JoinUs/JoinUs';
import { Calendar } from '@basics';

const AboutPage: FunctionComponent = () => (
  <RemoveLayoutMargin>
    <div className={styles.background}>
      <WhyWeStartedHomehub />

      <MeetTheTeam />

      <HomehubPlan />

      <JoinUs />
    </div>
  </RemoveLayoutMargin>
);

export default AboutPage;
