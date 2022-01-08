import React, { FunctionComponent, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { landingIcons } from '@icons';
import styles from './LandingPage.module.scss';
import Button from '@components/basics/Button';
import { useRouter } from 'next/dist/client/router';
import { TriggerPageView } from '@components/ga';
import { miscIcons, howToPost } from '@icons';
import { FilledImage } from '@basics';
import cn from 'classnames';

const HomehubWelcomeInfo: FunctionComponent = () => {
  const router = useRouter();
  const routeToHouseListings = () => {
    router.push('/housing', undefined, { shallow: true });
  };

  useEffect(() => {
    TriggerPageView('landing_page');
  }, []);

  return (
    <div className={styles.title}>
      <div className={styles.bigRow}>
        <landingIcons.logo className={styles.logo} />{' '}
        <span className={styles.logoText}>Homehub</span>
      </div>
      <div className={styles.bigRow}>
        <div className={styles.text}>
          Find your ideal home away from home ASAP
        </div>
      </div>
      <div className={styles.bigRow}>
        <div className={styles.subtext}>
          By students <span className={styles.dot}></span> For students{' '}
          <span className={styles.dot}></span> With students
        </div>
      </div>
      <div className={styles.center}>
        <Button onClick={() => router.push('/housing')}>
          <div className={styles.buttonInner}>Check it Out</div>
        </Button>
      </div>
    </div>
  );
};

const Landing: FunctionComponent = () => {
  const router = useRouter();
  const [currentPostStep, setCurrentPostStep] = useState(1);

  type HowToPostKey = keyof typeof howToPost;

  return (
    <Container className={styles.container} id={styles.landing}>
      <HomehubWelcomeInfo></HomehubWelcomeInfo>

      <Row className={styles.intro}>
        <Col className={styles.housingicon}>
          <landingIcons.housing />
        </Col>
        <Col className={styles.textIntro}>
          <div className={styles.textLg}>What is Homehub?</div>
          <div className={styles.subtextIntro}>
            Homehub connects students with their peers within UCSD to create a
            reliable housing network for college students to find great places
            to live.
          </div>
        </Col>
      </Row>

      <Row>
        <Col className={styles.homePageCardCol}>
          <div className={styles.homePageCard}>
            <div>photo</div>
            <div>Have a place?</div>
            <div>
              <Button>Post it Now</Button>
            </div>
          </div>
        </Col>
        <Col className={styles.homePageCardCol}>
          <div className={styles.homePageCard}>
            <div>photo</div>
            <div>Looking for a place?</div>
            <div>
              <Button>Explore listings</Button>
            </div>
          </div>
        </Col>
      </Row>

      <div>
        <h3> Post Your Place</h3>
        <Row>
          <Col xs={5}>
            <div
              className={styles.postStep}
              onMouseEnter={() => setCurrentPostStep(1)}
            >
              <span
                className={cn({ [styles.postStepText]: 1 === currentPostStep })}
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
                className={cn({ [styles.postStepText]: 2 === currentPostStep })}
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
                className={cn({ [styles.postStepText]: 3 === currentPostStep })}
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
                className={cn({ [styles.postStepText]: 4 === currentPostStep })}
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
    </Container>
  );
};

export default Landing;
