import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { HousePost } from '../../../models/PostModels';
import { contactIcons } from '@icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { LOGIN_TO_VIEW } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectHousingFavorites, selectUser } from '@redux';
import { Map } from '@basics';
import { abbreviateAddress } from '../../../utils';
import styles from './ThirdColumn.module.scss';

// type CommmonProps = Pick<
//   HousePost,
//   | 'distance'
//   | 'roomDescription'
//   | 'profilePhoto'
//   | 'leaserEmail'
//   | 'leaserName'
//   | 'leaserSchoolYear'
//   | 'leaserMajor'
//   | 'leaserPhone'
//   | 'location'
// >;
// type Props = CommonProps &
//   ({ preview?: false; roomId: number } | { preview: true; roomId: undefined });

interface Props
  extends Pick<
    HousePost,
    | 'distance'
    | 'roomDescription'
    | 'profilePhoto'
    | 'leaserEmail'
    | 'leaserName'
    | 'leaserSchoolYear'
    | 'leaserMajor'
    | 'leaserPhone'
    | 'location'
  > {
  roomId?: number;
}

const ThirdColumn: React.FC<Props> = ({
  distance,
  roomDescription,
  profilePhoto,
  leaserEmail,
  leaserName,
  leaserSchoolYear,
  leaserMajor,
  leaserPhone,
  location,
  roomId,
}) => {
  const favorites = useSelector(selectHousingFavorites);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <Col sm={12} md={6} lg={4} className={styles.wrapper}>
      <div className={`${styles.topHalf} pl-lg-1`}>
        <div className={styles.favoriteWrapper}>
          <Button
            variant="tertiary"
            block
            onClick={() => {
              if (!roomId) return;

              if (favorites && favorites[roomId]) {
                // need to remove from the favorites
                // dispatch(removeHousingFavorite(roomId));
                // TODO
              } else {
                // need to add to the favorites
                // dispatch(newHousingFavorite(housePost));
                // TODO
              }
            }}
          >
            {roomId && favorites && favorites[roomId]
              ? 'Unfavorite'
              : 'Favorite'}
          </Button>
          <Button variant="no-show">
            <contactIcons.share />
          </Button>
        </div>

        <div className={styles.distance}>
          <b>~ {distance}</b>&nbsp;public transit from Price Center
        </div>
        <div className={styles.address}>{abbreviateAddress(location)}</div>
        <Map address={location} className={styles.map} />
      </div>

      <Container className={styles.bio}>
        <Row>
          <Col xs={8} lg={9} className={styles.textCenter}>
            <div className="primary-text">{leaserName}</div>

            <div className="secondary-text">
              {leaserSchoolYear} | {leaserMajor}
            </div>

            <Row className={styles.contactWrapper}>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip">
                    {user ? leaserEmail : LOGIN_TO_VIEW}
                  </Tooltip>
                }
              >
                <contactIcons.email
                  className={styles.contact}
                  onClick={async () => {
                    if (user) {
                      await navigator.clipboard.writeText(leaserEmail);
                      window.open(`mailto:${leaserEmail}`, '_blank');
                    }
                  }}
                />
              </OverlayTrigger>

              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip">
                    {user ? leaserPhone : LOGIN_TO_VIEW}
                  </Tooltip>
                }
              >
                <contactIcons.phone
                  className={styles.contact}
                  onClick={async () => {
                    if (user) {
                      await navigator.clipboard.writeText(leaserPhone);
                      window.open(`tel:${leaserPhone}`, '_blank');
                    }
                  }}
                />
              </OverlayTrigger>
            </Row>
          </Col>

          <Col xs={4} lg={3} className={styles.profilePhotoWrapper}>
            <Image
              src={profilePhoto}
              roundedCircle
              className={styles.profilePhoto}
            />
          </Col>
        </Row>

        <div className={styles.speechBubble}>{roomDescription}</div>
      </Container>
    </Col>
  );
};

export default ThirdColumn;
