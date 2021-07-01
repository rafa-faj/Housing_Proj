import React, { FunctionComponent } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './HomehubPlan.module.scss';
import { aboutUsIcons } from '@icons';
import useBreakpoints from 'use-window-width-breakpoints';

const summer = 'Summer 2021';
const fall = 'Fall 2021';
const filter_title = 'Faster with Filter';
const filter_content =
  'Input your preferences to get matched more quickly and more accurately with room listings that suit you criteria';
const bulletin_title = 'Bulletin Board';
const bulletin_content =
  'Students will be able to post their own listings to find roommates or pass off a lease';
const roommate_title = 'Roommate Radar';
const roommate_content =
  'Allow students to look for other students to live with. Students will be able to post themselves as potential roommates';

interface HomehubPlanRowDeatils {
  time: string;
  title: string;
  content: string;
  className: string;
}

const HomehubPlanRow1Deatils = {
  time: summer,
  title: filter_title,
  content: filter_content,
  className: styles.plan_1,
};

const HomehubPlanRow2Deatils = {
  time: summer,
  title: bulletin_title,
  content: bulletin_content,
  className: styles.plan_2,
};

const HomehubPlanRow3Deatils = {
  time: fall,
  title: roommate_title,
  content: roommate_content,
  className: styles.plan_3,
};

const TimeLineHorizontal: FunctionComponent = () => (
  <div className={styles.timeline_wrapper}>
    <aboutUsIcons.timeDot className={styles.timedot} />
  </div>
);

const TimeLineVertical: FunctionComponent = () => (
  <Col xs={1} className={styles.timeline_small}>
    <aboutUsIcons.timeDot className={styles.timedot_small} />
  </Col>
);

const PlanTime: FunctionComponent<{ time: string }> = ({ time }) => (
  <Row className={styles.plan_md_center_wrapper}>
    <h5 className={styles.plan_time}>{time}</h5>
  </Row>
);

const PlanTitle: FunctionComponent<{ title: string }> = ({ title }) => (
  <Row className={styles.plan_md_center_wrapper}>
    <h5 className={styles.plan_title}>{title}</h5>
  </Row>
);

const PlanContent: FunctionComponent<{ content: string }> = ({ content }) => (
  <Row className={styles.plan_row}>{content}</Row>
);

const HomehubPlanSmallRow: FunctionComponent<HomehubPlanRowDeatils> = ({
  time,
  title,
  content,
  className,
}) => (
  <Row className={className}>
    <TimeLineVertical />
    <Col>
      <PlanTime time={time} />
      <PlanTitle title={title} />
      <PlanContent content={content} />
    </Col>
  </Row>
);

const HomehubPlanSmall: FunctionComponent = () => (
  <Container fluid className="px-0">
    <HomehubPlanSmallRow {...HomehubPlanRow1Deatils} />
    <HomehubPlanSmallRow {...HomehubPlanRow2Deatils} />
    <HomehubPlanSmallRow {...HomehubPlanRow3Deatils} />
  </Container>
);

const HomehubPlanBigCol: FunctionComponent<HomehubPlanRowDeatils> = ({
  time,
  title,
  content,
  className,
}) => (
  <Col xs={12} md={4} className={className}>
    <PlanTitle title={title} />
    <PlanContent content={content} />
    <TimeLineHorizontal />
    <PlanTime time={time} />
  </Col>
);

const HomehubPlanBig: FunctionComponent = () => (
  <Container fluid className="px-0">
    <Row>
      <HomehubPlanBigCol {...HomehubPlanRow1Deatils} />
      <HomehubPlanBigCol {...HomehubPlanRow2Deatils} />
      <HomehubPlanBigCol {...HomehubPlanRow3Deatils} />
    </Row>
  </Container>
);

const HomehubPlan: FunctionComponent = () => {
  const breakpoint = useBreakpoints();
  return (
    <div className={styles.plan_wrapper}>
      <Row className="justify-content-center mb-4">
        <h3>the Plan of Homehub</h3>
      </Row>
      {breakpoint.down.sm ? <HomehubPlanSmall /> : <HomehubPlanBig />}
    </div>
  );
};

export default HomehubPlan;
