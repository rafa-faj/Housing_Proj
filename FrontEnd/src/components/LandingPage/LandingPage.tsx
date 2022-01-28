import { FilledImage, Link } from '@basics';
import { RemoveLayoutMargin } from '@components';
import Button from '@components/basics/Button';
import { TriggerPageView } from '@components/ga';
import { howToPost, landingIcons, miscIcons } from '@icons';
import cn from 'classnames';
import { useRouter } from 'next/dist/client/router';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Typewriter from 'typewriter-effect';
import styles from './LandingPage.module.scss';

const HomehubWelcomeInfo: FunctionComponent = () => {
  useEffect(() => {
    TriggerPageView('landing_page');
  }, []);

  return (
    <div className={styles.banner}>
      <div className={styles.bannerContent}>
        <div className={styles.text}>Welcome to</div>
        <landingIcons.newLogo className={styles.logo} />
        <div className={styles.text}>Find UCSD Off-Campus Housing</div>
        <div className={styles.byStudents}>
          <div className={styles.by}>
            <Typewriter
              options={{
                strings: ['By', 'With', 'For'],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          <div className={styles.students}>students</div>
        </div>
      </div>
      <landingIcons.bannerGeisel className={styles.bannerGeisel} />
    </div>
  );
};

const HomePageCard: FunctionComponent = () => {
  return (
    <Row className={styles.homePageCardRow}>
      <Col lg={12} xl={5} className={styles.homePageCardCol}>
        <div className={styles.homePageCard}>
          <FilledImage
            alt={`house illustration`}
            src={landingIcons.cardHouse}
            className={styles.cardImage}
          />
          <div className={styles.cardBottom}>
            <div className={styles.homePageCardText}>
              <div className={styles.homePageCardTextTitle}>Have a place?</div>
              <div className={styles.text}>
                Post your place now so that your ideal roommates/ suitemates can
                find you ASAP
              </div>
            </div>
            <Button>Post it Now</Button>
          </div>
        </div>
      </Col>
      <Col className={styles.middleGap} />
      <Col lg={12} xl={5} className={styles.homePageCardCol}>
        <div className={styles.homePageCard}>
          <FilledImage
            alt={`people illustration`}
            src={landingIcons.cardPeople}
            className={styles.cardImage}
          />
          <div className={styles.cardBottom}>
            <div className={styles.homePageCardText}>
              <div className={styles.homePageCardTextTitle}>
                Looking for a place?
              </div>
              <div className={styles.text}>
                Check out the listings from others to filter the ones that meet
                your criteria
              </div>
            </div>
            <Button>Explore listings</Button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

const PostYourPlace: FunctionComponent = () => {
  const [currentPostStep, setCurrentPostStep] = useState(1);

  type HowToPostKey = keyof typeof howToPost;

  return (
    <div className={styles.postPlace}>
      <h3> Post Your Place</h3>
      <Row>
        <Col xs={5}>
          <div
            className={styles.postStep}
            onMouseEnter={() => setCurrentPostStep(1)}
          >
            <span
              className={cn({
                [styles.postStepText]: 1 === currentPostStep,
              })}
            >
              1 - Start with school email
            </span>
            <span
              className={cn(styles.postStepArrow, {
                [styles.currentStep]: 1 === currentPostStep,
              })}
            >
              <miscIcons.orangeArrow />
            </span>
          </div>
          <div
            className={styles.postStep}
            onMouseEnter={() => setCurrentPostStep(2)}
          >
            <span
              className={cn({
                [styles.postStepText]: 2 === currentPostStep,
              })}
            >
              1 - Start with school email
            </span>
            <span
              className={cn(styles.postStepArrow, {
                [styles.currentStep]: 2 === currentPostStep,
              })}
            >
              <miscIcons.orangeArrow />
            </span>
          </div>
          <div
            className={styles.postStep}
            onMouseEnter={() => setCurrentPostStep(3)}
          >
            <span
              className={cn({
                [styles.postStepText]: 3 === currentPostStep,
              })}
            >
              1 - Start with school email
            </span>
            <span
              className={cn(styles.postStepArrow, {
                [styles.currentStep]: 3 === currentPostStep,
              })}
            >
              <miscIcons.orangeArrow />
            </span>
          </div>
          <div
            className={styles.postStep}
            onMouseEnter={() => setCurrentPostStep(4)}
          >
            <span
              className={cn({
                [styles.postStepText]: 4 === currentPostStep,
              })}
            >
              1 - Start with school email
            </span>
            <span
              className={cn(styles.postStepArrow, {
                [styles.currentStep]: 4 === currentPostStep,
              })}
            >
              <miscIcons.orangeArrow />
            </span>
          </div>
        </Col>
        <Col>
          <FilledImage
            src={howToPost[`step${currentPostStep}` as HowToPostKey]}
            className={styles.stepImage}
          />
        </Col>
      </Row>
    </div>
  );
};

const OurMission: FunctionComponent = () => {
  return (
    <>
      <Row className={styles.ourMissonWrapper}>
        <Col className={styles.ourMissionTextCol} xl={5}>
          <div className={styles.ourMissionTextColHeader}>Our Mission</div>
          <div className={styles.ourMissionTextColDescription}>
            {`To reduce the hassle of living off-campus and dealing with real-world problems for students.`}
          </div>
          <Link href="/about" undecorated>
            <Button
              variant="outline"
              className={styles.ourMissionTextColButton}
            >
              Learn About Homehub
            </Button>
          </Link>
        </Col>
        <Col xl={7}>
          <FilledImage
            src={landingIcons.ourMission}
            className={styles.ourMissionImage}
          />
        </Col>
      </Row>
      <Row className={styles.backgroundHouse}>
        <landingIcons.backgroundHouse />
      </Row>
    </>
  );
};

const Landing: FunctionComponent = () => {
  return (
    <RemoveLayoutMargin>
      <div className={styles.background}>
        <HomehubWelcomeInfo />

        <HomePageCard />

        <PostYourPlace />

        <OurMission />
      </div>
    </RemoveLayoutMargin>
  );
};

export default Landing;
