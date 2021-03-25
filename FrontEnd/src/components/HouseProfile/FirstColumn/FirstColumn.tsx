import React from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { miscIcons } from '../../../assets/icons/all';
import SlideShow from '../../basics/SlideShow/SlideShow';
import { HousePost } from '../../../models/PostModels';
import { photosToUrls } from '../../../utils/photos/index';
import styles from './FirstColumn.module.scss';

interface Props extends Pick<HousePost, 'leaserEmail' | 'location'> {
  photos: File[] | string[];
  onExit: () => any;
}

const FirstColumn: React.FC<Props> = ({
  leaserEmail,
  location,
  photos,
  onExit,
}) => {
  // set the slide show content
  const slideShowItems = photosToUrls(photos).map((url) => ({
    src: url,
    alt: `${leaserEmail} , ${location}}`,
  }));

  return (
    <Col sm={12} lg={4}>
      {/* TODO: margins on top and left */}
      <Button
        variant="no-show"
        onClick={() => onExit()}
        className={styles.closeBtn}
      >
        <miscIcons.greenX />
      </Button>
      <SlideShow
        images={slideShowItems}
        className={styles.slideshow}
        showPreview
      />
    </Col>
  );
};

export default FirstColumn;
