import React, { FunctionComponent, useState, useEffect } from 'react';
import styles from './ApplicationDetails.module.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Subtitle1 from '@basics/Subtitle1'
import Subtitle2 from '@basics/Subtitle2'
import Body2 from '@basics/Body2'
import { profileIcons } from '@icons';
import {useLandlordRoomData} from '@hooks'

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

interface ApplicationDetailsProps {}

const ApplicationDetails: FunctionComponent<ApplicationDetailsProps> = ({}) => {
  const windowSize = useWindowSize();
  // hook to see whether we should display proof of income in column or row based on screen size
  const [displayColumn, setdisplayColumn] = useState(true);
  useEffect(() => {
    if (windowSize.width < 768){
      setdisplayColumn(false);
    }else{
      setdisplayColumn(true);
    }
  },[windowSize]);
  console.log(useLandlordRoomData());
  return (
    <Container fluid className={styles.container}>
        <Row>
          <Col className={styles["profile-section-divider"]}>
          To Apply 
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 3}}>
          <Row className={styles["application-component"]}>
            <Col>
              <Subtitle2>
              Application Fee
              </Subtitle2>
              <Body2>
              $50/applicant 
              </Body2>
            </Col>
          </Row>
          <Row className={styles["application-component"]}>
            <Col>
              <Subtitle2>
              Housing Deposit
              </Subtitle2>
              <Body2>
              $500 base deposit due with approved screening, and up to half a month’s rent for a deposit on a conditional approval
              </Body2>
            </Col>
          </Row>
          </Col>
          <Col md={{ span: 3, offset: 1}}>
          <Row className={styles["application-component"]}>
            <Col>
              <Subtitle2>
              Holding Period
              </Subtitle2>
              <Body2>
              14 days from your application date if it’s vacant or from the date it is move-in ready if it's still occupied. 
              </Body2>
            </Col>
          </Row>
          <Row className={styles["application-component"]}>
            <Col>
              <Subtitle2>
              Verification
              </Subtitle2>
              <Body2>
              Government issued ID: passport, driver license, SSN
              </Body2>
            </Col>
          </Row>
          </Col>
          <Col md={{ span: 3, offset: 1}}>
          <Row className={styles["application-component"]}>
            <Col>
              <Subtitle2>
              Holding Deposit
              </Subtitle2>
              <Body2>
              $100 (refundable, applied towards deposit total)
              </Body2>
            </Col>
          </Row>
          </Col>
        </Row>
        <Row className={styles["proof-of-income"]}>
          <Row className={styles["proof-of-income-inner"]}>
            <Col xs={{offset:1, span: 11}} md={{span: 5}} lg={{span: 4}} xl={{span: 3}}>
                {displayColumn
                ?
                <>
                <Col>
                  <profileIcons.ProofOfIncome className={styles["profile-icon"]}/>
                </Col>
                <Col>
                  <div className={styles["small-subtitle"]}>Proof of Income</div>
                </Col>
                </>
                :
                <Row className="align-items-center">
                  <profileIcons.ProofOfIncome className={styles["profile-icon"]}/>
                  <div className={styles["small-subtitle"]}>Proof of Income</div>
                </Row>
                }
            </Col>
            <Col xs={{offset:1}} md={{offset:0}}>
              <Col>
                <Subtitle1>
                Income criteria based on the gross income on 2.5 times the base rent.
                </Subtitle1>
              </Col>
            </Col>
          </Row>
        </Row>
    </Container>
  )
};

export default ApplicationDetails;
