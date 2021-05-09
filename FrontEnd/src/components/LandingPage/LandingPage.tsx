import React, { FunctionComponent } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { landingIcons } from '@icons';
import styles from './LandingPage.module.scss';

const Landing: FunctionComponent = () => (
  <Container>
    <div className={styles.title}>
      <Row className={styles.bigRow}>
        <landingIcons.logo />
      </Row>
      <Row className={styles.bigRow}>
        <div className={styles.text}>Find your ideal home away from home ASAP</div>
      </Row>
      <Row className={styles.bigRow}>
        <div className={styles.subtext}>By students ⦿ For students ⦿ With students</div>
      </Row>
      <Row className={styles.center}>
        <Button variant="secondary" href="https://forms.gle/jxmNTJE6L2dZBsug9">
          <div className={styles.buttonInner}>Check it Out</div>
        </Button>
      </Row>
    </div>

    <Row className={styles.intro}>
          <Col><landingIcons.housing /></Col>
          <Col>
            <div className={styles.textLg}>What is HomeHub?</div>
            <div className={styles.subtextIntro}>
              Homehub connects students with their peers within UCSD, 
              to create a reliable housing network for college students 
              to find great places to live.
            </div>
          </Col>
    </Row>

    <Row className={styles.intro}>
      <Row className={styles.bigRow}>
        <div className={styles.textLg}>Why HomeHub?</div>
      </Row>
      <Row className={styles.iconRow}>
        <Col>
          <Row className={styles.smallRow}>
            <landingIcons.safe className={styles.smallImg} />
          </Row>
          <Row className={styles.caption}>Safety</Row>
          <div className={styles.textSm}>
            Homehub <b>requires a “@ucsd. edu” email address</b> to create an
            account and interact with listings by other students.
          </div>
        </Col>
        <Col>
          <Row className={styles.smallRow}>
            <landingIcons.efficient className={styles.smallImg} />
          </Row>
          <Row className={styles.caption}>Efficiency</Row>
          <div className={styles.textSm}>
            Finding a home that fits all your needs is <b>easy and quick </b>
            through our smart <b>filter & match</b> and search options.
          </div>
        </Col>
        <Col>
          <Row className={styles.smallRow}>
            <landingIcons.connection className={styles.smallImg} />
          </Row>
          <Row className={styles.caption}>Community</Row>
          <div className={styles.textSm}>
            After signing up, you will be grouped with peer students at UCSD to 
            <b>get more involved with others in the community.</b>
          </div>
        </Col>
      </Row>
      <Row className={styles.center}>
        <Button variant="secondary" href="https://forms.gle/jxmNTJE6L2dZBsug9">
          <div className={styles.buttonInner}>Check it Out</div>
        </Button>
      </Row>
    </Row>
  </Container>
);

/*const Landing: FunctionComponent = () => (
  <Container>
    <Row className={styles.title}>
      Welcome to &nbsp; <b>Homehub 1.0 !</b>
    </Row>

    <Row className={styles.infoSectionWrapper}>
      <Col>
        <Row className={styles.bigRow}>
          <landingIcons.one />
          <div className={styles.subtitle}>
            <b>What</b> is HomeHub?
          </div>
        </Row>
        <Row className={styles.bigRow}>
          <div className={styles.text}>
            Homehub connects students with their peers within UCSD, to create a{' '}
            <b>reliable housing network</b> for college students to{' '}
            <b>find great places to live.</b>
          </div>
        </Row>
        <Row className={styles.center}>
          <landingIcons.housing />
        </Row>
      </Col>
      <Col>
        <Row className={styles.bigRow}>
          <landingIcons.two />
          <div className={styles.subtitle}>
            <b>Why</b> use HomeHub?
          </div>
        </Row>
        <Row>
          <Col>
            <Row className={styles.smallRow}>
              <landingIcons.safe className={styles.smallImg} />
            </Row>
            <Row className={styles.caption}>Safe</Row>
            <div className={styles.textSm}>
              Homehub <b>requires a “@ucsd. edu” email address</b> to create an
              account and interact with listings by other students.
            </div>
          </Col>
          <Col>
            <Row className={styles.smallRow}>
              <landingIcons.efficient className={styles.smallImg} />
            </Row>
            <Row className={styles.caption}>Efficient</Row>
            <div className={styles.textSm}>
              Finding a home that fits your needs is easy through our{' '}
              <b>smart filter & match and search options.</b>
            </div>
          </Col>
          <Col>
            <Row className={styles.smallRow}>
              <landingIcons.connection className={styles.smallImg} />
            </Row>
            <Row className={styles.caption}>Connection</Row>
            <div className={styles.textSm}>
              After signing up, users are grouped with{' '}
              <b>other students at UC San Diego.</b>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>

    <Row className={styles.center}>
      <Button variant="secondary" href="https://forms.gle/jxmNTJE6L2dZBsug9">
        <div className={styles.buttonInner}>Sign up FOR FREE</div>
      </Button>
    </Row>
  </Container>
);*/

export default Landing;
