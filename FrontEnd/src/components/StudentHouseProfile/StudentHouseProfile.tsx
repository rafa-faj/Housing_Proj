import React, { FunctionComponent } from 'react';
import { Col } from 'react-bootstrap';
import PlaceDetails from './PlaceDetails/PlaceDetails';
import LookingFor from './LookingFor/LookingFor';
import NameCard from './NameCard/NameCard';
import GeneralInfo from './GeneralInfo/GeneralInfo';
import ProfileSlideShow from './ProfileSlideShow/ProfileSlideShow';
import useBreakpoints from 'use-window-width-breakpoints';
import { useUser } from '@hooks';
import { StudentHousePost } from '@models';

const StudentHousingProfile: FunctionComponent<StudentHousePost> = ({
  photos,
  placeName,
  address,
  distance,
  rent,
  numBath,
  numBed,
  utility,
  roomType,
  roomCapacities,
  lookingForCount,
  amenities,
  availMonth,
  availYear,
  untilMonth,
  untilYear,
  startDate,
  endDate,
  genders,
  habits,
  placeDescription,
  userEmail,
  userPhone,
  userPhoto,
  userName,
  major,
  schoolYear,
  userBio,
}) => {
  const { data: user } = useUser();
  const breakpoint = useBreakpoints();
  const photoUrls = photos.map((photoFile) => URL.createObjectURL(photoFile));
  const slideShowItems = photoUrls.map((url) => ({
    src: url,
    alt: `${placeName} , ${address}}`,
  }));
  const profileSlideShow = <ProfileSlideShow photos={slideShowItems} />;
  const placeDetails = (
    <PlaceDetails
      {...{
        rent,
        numBed,
        numBath,
        utility,
        roomType,
        roomCapacities,
        lookingForCount,
        amenities,
        availMonth,
        availYear,
        untilMonth,
        untilYear,
        startDate,
        endDate,
      }}
    />
  );
  const lookingFor = <LookingFor {...{ genders, habits, placeDescription }} />;
  const generalInfo = <GeneralInfo {...{ address, distance, placeName }} />;
  const nameCard = (
    <NameCard
      {...{
        userEmail,
        userPhone,
        userPhoto,
        userName,
        major,
        schoolYear,
        userBio,
        isLoggedIn: user.isLoggedIn,
      }}
    />
  );
  return (
    <>
      {breakpoint.up.lg ? (
        <>
          <Col xs={{ offset: 1, span: 5 }}>
            {profileSlideShow}
            {placeDetails}
            {lookingFor}
          </Col>
          <Col className="pl-4" xs={5}>
            {generalInfo}
            {nameCard}
          </Col>
        </>
      ) : (
        <>
          <Col xs={12}>{profileSlideShow}</Col>
          <Col xs={12} className="mt-3">
            {generalInfo}
          </Col>
          <Col xs={12} className="mt-3">
            {nameCard}
          </Col>
          <Col xs={12} className="mt-3">
            {placeDetails}
          </Col>
          <Col xs={12} className="mt-3">
            {lookingFor}
          </Col>
        </>
      )}
    </>
  );
};

export default StudentHousingProfile;
