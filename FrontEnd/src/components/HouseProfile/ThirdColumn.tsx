import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { HousePost } from '../../models/PostModels';
import { contactIcons } from '../../assets/icons/all';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { LOGIN_TO_VIEW } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectHousingFavorites } from '../../redux/slices/housing';
import { selectUser } from '../../redux/slices/auth';
import GoogleMap from '../GoogleMap';
import { abbreviateAddress } from '../../utils';

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
    <Col sm={12} md={6} lg={4} className="d-flex flex-column mt-3">
      <div className="house-profile-top-half">
        <div className="d-flex pr-3 align-content-center justify-content-center">
          <Button
            variant="tertiary"
            block
            onClick={() => {
              if (!roomId) return;

              if (favorites && favorites[roomId]) {
                // need to remove from the favorites
                // dispatch(removeHousingFavorite(roomId));
                // TODO
                console.log();
              } else {
                // need to add to the favorites
                // dispatch(newHousingFavorite(housePost));
                // TODO
                console.log();
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

        <div className="address-related-text">
          <b>~ {distance}</b>&nbsp;public transit from Price Center
        </div>
        <div className="secondary-text">{abbreviateAddress(location)}</div>
        <GoogleMap address={location} className="house-profile-map" />
      </div>

      <Container className="housing-profile-bio">
        <Row>
          <Col xs={8} lg={9} className="text-center">
            <div className="primary-text">{leaserName}</div>

            <div className="secondary-text">
              {leaserSchoolYear} | {leaserMajor}
            </div>

            <Row className="justify-content-center">
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip">
                    {user ? leaserEmail : LOGIN_TO_VIEW}
                  </Tooltip>
                }
              >
                <contactIcons.email
                  className="d-block mr-3"
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
                  className="d-block mr-3"
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

          <Col xs={4} lg={3} className="mt-auto text-center">
            <Image src={profilePhoto} roundedCircle className="w-100" />
          </Col>
        </Row>

        <div className="housing-profile-speech-bubble">{roomDescription}</div>
      </Container>
    </Col>
  );
};

export default ThirdColumn;
