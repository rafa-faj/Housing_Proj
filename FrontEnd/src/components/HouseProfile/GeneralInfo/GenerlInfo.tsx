import React, { FunctionComponent } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SlideShow, SlideShowItem } from '@basics'
import { miscIcons } from '@icons'
import styles from './GeneralInfo.module.scss';


interface GeneralInfoProps {
  images: SlideShowItem[],
  address: string,
  distance: string,
  name: string
}

const GeneralInfo: FunctionComponent<GeneralInfoProps> = ({
  images,
  address,
  distance,
  name
}) => {
  return (
    <>
      <Container className={styles.container}>
        <Row>
          <Col md={7} className={styles.pic}><SlideShow
            images={images}
            className={styles.slide}
          /></Col>

          <Col md={5}>
            <div className={styles.textPortion}>
              <div className={styles.day}>
                <miscIcons.RoundArrow /> 2 days ago
              </div>
              <div>{name}</div>
              <div className={styles.address}>
                <div className={styles.locationIcon}>
                  <miscIcons.LocationIcon />
                </div>
                <div> {address} </div>
              </div>
              <div className={styles.distance}>
                <miscIcons.busIcon /> <b>~ {distance} transit</b>&nbsp;
              </div>
              <div>
                <div className={styles.date}>
                  Available from June 1, 2021{/*{formattedMoveIn}*/}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>);
};

export default GeneralInfo;
