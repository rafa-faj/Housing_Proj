import React, { FunctionComponent, useState, useEffect } from 'react';
import styles from './ApplicationDetails.module.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Subtitle1, Subtitle2, Body2, Link } from '@basics';
import { profileIcons } from '@icons';
import { useLandlordRoomData } from '@hooks';
import { getDurationInMinutes } from '@apis';
import SectionTitle from '../SectionTitle/SectionTitle';
import ProofOfIncome from './ProofOfIncome/ProofOfIncome';

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
    return <div>Loading How to Apply...</div>; // TODO add a loader
  }

  const {
    applicationFee,
    holdingPeriod,
    holdingDeposit,
    housingDeposit,
    verification,
    proofOfIncome,
    website,
  } = data;

  // Used in ApplicationDetails to display information with labels
  const details = {
    'Application Fee': (
      <div className="d-flex">
        ${applicationFee}/applicant
        <Link href={website} external className={styles.applyNowLink}>
          Apply Now
        </Link>
      </div>
    ),
    'Holding Period': holdingPeriod,
    'Holding Deposit': holdingDeposit,
    'Housing Deposit': housingDeposit,
    Verification: verification,
  };

  // Changes details specified above into appropriate text + columns
  const ApplicationDetailTiles: FunctionComponent = () => (
    <Row className={styles.applicationDetailTiles}>
      {Object.entries(details).map(([label, value]) => (
        <Col xs={12} md={4} className="py-3 pr-md-3">
          <Subtitle2>{label}</Subtitle2>
          <Body2>{value}</Body2>
        </Col>
      ))}
    </Row>
  );

  return (
    <Container>
      <SectionTitle>To Apply</SectionTitle>

      <ApplicationDetailTiles />

      <ProofOfIncome proofOfIncome={proofOfIncome} />
    </Container>
  );
};

export default ApplicationDetails;
