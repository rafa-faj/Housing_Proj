import React, { FunctionComponent } from 'react';
import cn from 'classnames';
import styles from './Footer.module.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, Subtitle1, Subtitle2 } from '@basics';
import { miscIcons } from '@icons';

const FirstColumn: FunctionComponent = () => (
  <div className={cn(styles.marginBottomProvider, styles.undecoratedLinks)}>
    {/* <div>Get Started</div> */}
    <Link href="" className={styles.getStarted}>
      <h5>Get Started</h5>
    </Link>
    {/* TODO designers haven't created yet... <Link href="/about">About</Link> */}
    {/* TODO designers haven't created yet... <Link href="/join-us">Join Us</Link> */}
    <Link href="">
      <Subtitle1>About</Subtitle1>
    </Link>
    <Link href="">
      <Subtitle1>Join Us</Subtitle1>
    </Link>
  </div>
);

const SecondColumn: FunctionComponent = () => (
  <div className={styles.marginBottomProvider}>
    <div>
      <h5>Got feedback or questions?</h5>
    </div>
    {/* TODO the email below should be a link */}
    <Subtitle1>
      Shoot us an email{' '}
      <span className={styles.greyedOut}>@ anemailhere@ucsd.edu</span>
    </Subtitle1>
    <Subtitle1 className={styles.greyedOut}>
      {/* copyright symbol */}
      &copy; All rights reserved @Homehub 2020
    </Subtitle1>
  </div>
);

const ThirdColumn: FunctionComponent = () => (
  <div className={cn(styles.marginBottomProvider, styles.homehubOrange)}>
    <Row>
      <Col>
        <h4>Homehub</h4>
      </Col>
      <Col>
        <miscIcons.Logo />
      </Col>
    </Row>
    <Subtitle2 className={styles.ellipses}>
      By students <miscIcons.ellipse /> For students <miscIcons.ellipse /> With
      students
    </Subtitle2>
  </div>
);

/**
 * The footer of the website. No Props because there shouldn't
 * be any configuration necessary.
 */
const Footer: FunctionComponent = () => (
  <footer>
    <div className={cn(styles.wrapper)}>
      <Container className="m-0">
        <Row>
          <Col md={2}>
            <FirstColumn />
          </Col>

          <Col md={6}>
            <SecondColumn />
          </Col>

          <Col md={4}>
            <ThirdColumn />
          </Col>
        </Row>
      </Container>
    </div>
  </footer>
);

export default Footer;
