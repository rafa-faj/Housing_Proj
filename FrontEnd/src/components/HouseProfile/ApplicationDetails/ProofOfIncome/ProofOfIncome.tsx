import React, { FunctionComponent } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { profileIcons } from '@icons';
import styles from './ProofOfIncome.module.scss';
import { Subtitle1 } from '@basics';

const ProofOfIncomeLabel: FunctionComponent = () => (
  <Row className={styles.iconAndLabel}>
    <profileIcons.ProofOfIncome />

    <Col xs={6} md={12} className={styles.label}>
      <h5>Proof of Income</h5>
    </Col>
  </Row>
);

interface ProofOfIncomeProps {
  proofOfIncome: string;
}

const ProofOfIncome: FunctionComponent<ProofOfIncomeProps> = ({
  proofOfIncome,
}) => (
  <Container className={styles.proofOfIncome}>
    <Row>
      <Col xs={12} md={4} className="pr-md-2">
        <ProofOfIncomeLabel />
      </Col>

      <Col xs={12} md={8} className="d-flex align-items-center pl-md-2">
        <Subtitle1>{proofOfIncome}</Subtitle1>
      </Col>
    </Row>
  </Container>
);

export default ProofOfIncome;
