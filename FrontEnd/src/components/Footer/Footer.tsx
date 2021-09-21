import React, { FunctionComponent } from 'react';
import cn from 'classnames';
import styles from './Footer.module.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, Subtitle2, Button } from '@basics';
import { miscIcons } from '@icons';
import { showLogin } from '@redux';
import { useDispatch } from 'react-redux';

const FirstColumn: FunctionComponent = () => {
  const dispatch = useDispatch();

  return (
    <div className={cn(styles.marginBottomProvider, 'px-md-0 px-3')}>
      <Button
        variant="wrapper"
        className={styles.getStarted}
        onClick={() => dispatch(showLogin())}
      >
        <Subtitle2>Get Started</Subtitle2>
      </Button>

      <Link href="/" undecorated>
        <div className={styles.childrenText}>About</div>
      </Link>

      <Link href="/" undecorated>
        <div className={styles.childrenText}>Join Us</div>
      </Link>
    </div>
  );
};

const homehubEmail = 'homehubdope@gmail.com';

const Email = () => (
  <Link href={`mailto:${homehubEmail}`} external undecorated>
    <div className={cn(styles.greyedOut, styles.email, styles.childrenText)}>
      {homehubEmail}
    </div>
  </Link>
);

const SecondColumn: FunctionComponent = () => (
  <div className={styles.marginBottomProvider}>
    <div>
      <Subtitle2>Got feedback or questions?</Subtitle2>
    </div>

    <div className={styles.childrenText}>
      Shoot us an email @ <Email />
    </div>

    <div className={(styles.greyedOut, styles.childrenText)}>
      {/* copyright symbol */}
      &copy; All rights reserved @Homehub 2020
    </div>
  </div>
);

const ThirdColumn: FunctionComponent = () => (
  <div className={cn(styles.marginBottomProvider, styles.homehubOrange)}>
    <Row>
      <Col className={styles.homehubLabel}>
        <Link href="/housing" undecorated>
          <h4 className={styles.homehubOrange}>Homehub</h4>
        </Link>
      </Col>

      <Col className="text-lg-right text-xl-right">
        <Link href="/housing" undecorated>
          <miscIcons.Logo />
        </Link>
      </Col>
    </Row>

    <div className={styles.ellipses}>
      By students <miscIcons.ellipse /> For students <miscIcons.ellipse /> With
      students
    </div>
  </div>
);

/**
 * The footer of the website. No Props because there shouldn't
 * be any configuration necessary.
 */
const Footer: FunctionComponent = () => (
  <footer>
    <div className={styles.wrapper}>
      <Container className="m-0">
        <Row>
          <Col xs={6} md={3} className="mb-5 mb-md-0">
            <FirstColumn />
          </Col>

          <Col xs={6} md={6} className="mb-5 mb-md-0">
            <SecondColumn />
          </Col>

          <Col xs={{ span: 8, offset: 2 }} md={{ span: 3, offset: 0 }}>
            <ThirdColumn />
          </Col>
        </Row>
      </Container>
    </div>
  </footer>
);

export default Footer;
