import React, { FunctionComponent, useState, useEffect } from 'react';
import styles from './ApplicationDetails.module.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Subtitle1 from '@basics/Subtitle1';
import Subtitle2 from '@basics/Subtitle2';
import Body2 from '@basics/Body2';
import { profileIcons } from '@icons';
import { useLandlordRoomData } from '@hooks';

interface ApplicationDetailsProps {
  roomId: number;
}

const ApplicationDetails: FunctionComponent<ApplicationDetailsProps> = ({
  roomId,
}) => {
  const { data, error } = useLandlordRoomData(roomId);

  if (error) {
    return <div>Error occurred!</div>; // TODO handle error in a different way
  }

  if (!data) {
    return <div>Loading...</div>; // TODO add a loader
  }

  const {
    name,
    address,
    rent,
    roomType,
    availability,
    leaseTerm,
    petPolicy,
    parking,
    utilityDetails,
    facility,
    applicationFee,
    holdingPeriod,
    holdingDeposit,
    housingDeposit,
    verification,
    proofOfIncome,
    images,
  } = data;
  console.log(data);

  return (
    <Container fluid className={styles.container}>
      <Row>
        <Col className={styles['profile-section-divider']}>To Apply</Col>
      </Row>
      <Row>
        <Col md={{ span: 3 }}>
          <Row className={styles['application-component']}>
            <Col>
              <Subtitle2>Application Fee</Subtitle2>
              <Body2>{applicationFee}</Body2>
            </Col>
          </Row>
          <Row className={styles['application-component']}>
            <Col>
              <Subtitle2>Housing Deposit</Subtitle2>
              <Body2>{holdingDeposit}</Body2>
            </Col>
          </Row>
        </Col>
        <Col md={{ span: 3, offset: 1 }}>
          <Row className={styles['application-component']}>
            <Col>
              <Subtitle2>Holding Period</Subtitle2>
              <Body2>{holdingPeriod}</Body2>
            </Col>
          </Row>
          <Row className={styles['application-component']}>
            <Col>
              <Subtitle2>Verification</Subtitle2>
              <Body2>{verification}</Body2>
            </Col>
          </Row>
        </Col>
        <Col md={{ span: 3, offset: 1 }}>
          <Row className={styles['application-component']}>
            <Col>
              <Subtitle2>Holding Deposit</Subtitle2>
              <Body2>{holdingDeposit}</Body2>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className={styles.proofOfIncome}>
        <div>
          <Row className="align-items-center">
            <profileIcons.ProofOfIncome className={styles['profile-icon']} />

            <Col xs={6} md={12}>
              <div className={styles['small-subtitle']}>Proof of Income</div>
            </Col>
          </Row>
        </div>

        <Subtitle1>{proofOfIncome}</Subtitle1>
      </div>
    </Container>
  );
};

export default ApplicationDetails;
