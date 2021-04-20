import React, { FunctionComponent } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { useDispatch, useSelector } from 'react-redux';
import { HousePost } from '@models';
import { contactIcons } from '@icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { LOGIN_TO_VIEW } from '@constants';
import { showLogin } from '@redux';
import { Map } from '@basics';
import { abbreviateAddress } from '@utils';
import { useRoomBookmarks, useUser } from '@hooks';
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

const ThirdColumn: FunctionComponent<Props> = ({
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
  const { user } = useUser();

  const dispatch = useDispatch();

  const { data: bookmarks, addBookmark, removeBookmark } = useRoomBookmarks();
  console.log(bookmarks);
  const isBookmarked = !!(roomId && bookmarks?.includes(roomId));

  const handleBookmarking = () => {
    // don't actually bookmark this if in preview mode
    if (!roomId) return;

    if (isBookmarked) {
      removeBookmark(roomId);
    } else {
      addBookmark(roomId);
    }
  };

  return (
    <Col sm={12} md={6} lg={4} className={styles.wrapper}>
      <div className={`${styles.topHalf} pl-lg-1`}>
        <div className={styles.favoriteWrapper}>
          <Button variant="tertiary" block onClick={handleBookmarking}>
            {isBookmarked ? 'Unfavorite' : 'Favorite'}
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
                      navigator.clipboard.writeText(leaserEmail);
                    } else {
                      dispatch(showLogin());
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
                      navigator.clipboard.writeText(leaserPhone);
                    } else {
                      dispatch(showLogin());
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
