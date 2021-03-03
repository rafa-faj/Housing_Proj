import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { miscIcons } from '../../assets/icons/all';
import SlideShow, { SlideShowItem } from '../basics/SlideShow';
import { HousePost } from '../../models/PostModels';
import useUserPhotos from '../../hooks/photos/useUserPhotos';

interface Props extends Pick<HousePost, 'leaserEmail' | 'location'> {
  photos: File[] | string[];
  onExit: () => any;
}

const FirstColumn: React.FC<Props> = ({
  leaserEmail,
  location,
  photos: unconvertedPhotos,
  onExit,
}) => {
  const [slideShowItems, setSlideShowItems] = useState<SlideShowItem[]>([]);
  const photos = useUserPhotos(unconvertedPhotos);

  // set the slide show content
  useEffect(() => {
    setSlideShowItems(
      photos.map((photo) => ({
        src: photo,
        alt: `${leaserEmail} , ${location}}`,
      })),
    );
  }, [photos, leaserEmail, location]);

  return (
    <Col sm={12} lg={4}>
      {/* TODO: margins on top and left */}
      <Button
        variant="no-show"
        onClick={() => onExit()}
        className="house-profile-close"
      >
        <miscIcons.greenX />
      </Button>
      <SlideShow
        images={slideShowItems}
        className="house-profile-preview-slideshow"
        showPreview
      />
    </Col>
  );
};

export default FirstColumn;
