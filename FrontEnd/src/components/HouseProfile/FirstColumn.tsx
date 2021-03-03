import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { miscIcons } from '../../assets/icons/all';
import SlideShow, { SlideShowItem } from '../basics/SlideShow';
import { HousePost } from '../../models/PostModels';
import useLocalPhotos from '../../hooks/useLocalPhotos';

interface Props extends Pick<HousePost, 'leaserEmail' | 'location'> {
  photos: File[] | string[];
  onHide: () => any;
}

const FirstColumn: React.FC<Props> = ({
  leaserEmail,
  location,
  photos: unconvertedPhotos,
  onHide,
}) => {
  const [slideShowItems, setSlideShowItems] = useState<SlideShowItem[]>([]);
  const [photos, isLocalFileURL] = useLocalPhotos(unconvertedPhotos);

  // set the slide show content
  useEffect(() => {
    setSlideShowItems(
      photos.map((url) => ({
        src: isLocalFileURL
          ? url
          : `https://houseit.s3.us-east-2.amazonaws.com/${url}`,
        alt: `${leaserEmail} , ${location}}`,
      })),
    );
  }, [photos, leaserEmail, location]);

  return (
    <Col sm={12} lg={4}>
      {/* TODO: margins on top and left */}
      <Button
        variant="no-show"
        onClick={() => onHide()}
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
