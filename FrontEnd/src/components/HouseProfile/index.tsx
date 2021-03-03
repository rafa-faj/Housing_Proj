import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { HousePost } from '../../models/PostModels';
import FirstColumn from './FirstColumn';
import SecondColumn from './SecondColumn';
import ThirdColumn from './ThirdColumn';
import useRoomPost from '../../hooks/useRoomPost';

type CommonProps = {
  show: boolean;
  onHide: () => any;
  aboveModalContent?: React.ReactNode;
  aboveModalContentClassName?: string;
  modalClassName?: string;
};

interface PreviewData extends Omit<HousePost, 'roomId' | 'photos'> {
  photos: File[];
}

export type HouseProfileProps = CommonProps &
  (
    | { preview?: false; roomId: number; data: undefined }
    | { preview: true; roomId: undefined; data: PreviewData }
  );

const HouseProfile: React.FC<HouseProfileProps> = ({
  show,
  onHide,
  aboveModalContent,
  aboveModalContentClassName = '',
  modalClassName = '',
  ...previewInfo // object destructuring makes discriminated unions not possible, so keep everything afflicted by preview in same object (look at homehub docs for more info)
}) => {
  const { data, error } = previewInfo.preview
    ? { data: previewInfo.data, error: undefined }
    : useRoomPost(previewInfo.roomId);

  if (!data) {
    return <div>Loading...</div>; // TODO add a loader
  }

  if (error) {
    return <div>Error occurred!</div>; // TODO handle error in a different way
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
    early,
    late,
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
      onHide={onHide}
      size="xl"
      centered
      className={`house-profile-modal ${modalClassName}`}
    >
      <div
        className={`house-profile-above-modal ${aboveModalContentClassName}`}
      >
        {aboveModalContent}
      </div>

      <Container className="p-0">
        <Row>
          <FirstColumn
            leaserEmail={leaserEmail}
            location={location}
            photos={photos}
            onHide={onHide}
          />

          <SecondColumn
            name={name}
            negotiable={negotiable}
            pricePerMonth={pricePerMonth}
            roomType={roomType}
            stayPeriod={stayPeriod}
            facilities={facilities}
            early={early}
            late={late}
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
            preview={previewInfo.preview}
            roomId={previewInfo.roomId}
          />
        </Row>
      </Container>
    </Modal>
  );
};

export default HouseProfile;
