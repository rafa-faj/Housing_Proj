import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { HousePostUIData } from '../../models/PostModels';
import FirstColumn from './FirstColumn/FirstColumn';
import SecondColumn from './SecondColumn/SecondColumn';
import ThirdColumn from './ThirdColumn/ThirdColumn';
import useRoomData from '../../hooks/swr/useRoomData';
import { Button } from 'react-bootstrap';
import styles from './HouseProfile.module.scss';
import classNames from 'classnames';

interface PreviewButtonsProps {
  onExit: () => any;
  onPublish: () => any;
}

const PreviewButtons: React.FC<PreviewButtonsProps> = ({
  onExit,
  onPublish,
}) => (
  <div className={styles.previewButtonsWrapper}>
    <div className={styles.previewButtons}>
      <Button variant="secondary" onClick={onExit}>
        Edit Post
      </Button>
      <Button variant="secondary" onClick={onPublish}>
        Publish Post
      </Button>
    </div>
  </div>
);

type CommonProps = {
  show: boolean;
  onExit: () => any;
};

export interface PreviewData extends Omit<HousePostUIData, 'photos'> {
  photos: File[];
}

type HandlePreview =
  | { preview?: false; roomId: number }
  | { preview: true; data: PreviewData; onPublish: () => any };

type HouseProfileProps = CommonProps & HandlePreview;

const HouseProfile: React.FC<HouseProfileProps> = (props) => {
  // object destructuring makes discriminated unions not possible, so keep everything in props and destructure within the function (look at homehub docs for more info)
  const { show, onExit } = props;

  const { data, error } = props.preview
    ? { data: props.data, error: undefined }
    : useRoomData(props.roomId);

  if (error) {
    return <div>Error occurred!</div>; // TODO handle error in a different way
  }

  if (!data) {
    return <div>Loading...</div>; // TODO add a loader
  }

  const {
    leaserEmail,
    location,
    photos,
    name,
    negotiable,
    pricePerMonth,
    roomType,
    stayPeriod,
    facilities,
    roomDescription,
    formattedMoveIn,
    other,
    distance,
    profilePhoto,
    leaserName,
    leaserSchoolYear,
    leaserMajor,
    leaserPhone,
  } = data;

  return (
    <Modal
      show={show}
      onHide={onExit}
      size="xl"
      centered
      className={classNames({ [styles.preview]: props.preview })}
      contentClassName={styles.modalContent}
    >
      {props.preview && (
        <PreviewButtons onExit={onExit} onPublish={props.onPublish} />
      )}

      <Container className={styles.container}>
        <Row>
          <FirstColumn
            leaserEmail={leaserEmail}
            location={location}
            photos={photos}
            onExit={onExit}
          />

          <SecondColumn
            name={name}
            negotiable={negotiable}
            pricePerMonth={pricePerMonth}
            roomType={roomType}
            stayPeriod={stayPeriod}
            facilities={facilities}
            formattedMoveIn={formattedMoveIn}
            other={other}
          />

          <ThirdColumn
            distance={distance}
            roomDescription={roomDescription}
            profilePhoto={profilePhoto}
            leaserEmail={leaserEmail}
            leaserName={leaserName}
            leaserSchoolYear={leaserSchoolYear}
            leaserMajor={leaserMajor}
            leaserPhone={leaserPhone}
            location={location}
            roomId={props.preview ? undefined : props.roomId}
          />
        </Row>
      </Container>
    </Modal>
  );
};

export default HouseProfile;
