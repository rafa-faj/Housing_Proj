import React, { FunctionComponent } from 'react';
import Col from 'react-bootstrap/Col';
import { miscIcons } from '@icons';
import { SlideShow, Button } from '@basics';
import { HousePost } from '../../../models/PostModels';
import { photosToUrls } from '../../../utils/photos/index';
import styles from './FirstColumn.module.scss';

interface Props extends Pick<HousePost, 'leaserEmail' | 'address'> {
  photos: File[] | string[];
  onExit: () => any;
}

const FirstColumn: FunctionComponent<Props> = ({
  leaserEmail,
  address,
  photos,
  onExit,
}) => {
  // set the slide show content
  const slideShowItems = photosToUrls(photos).map((url) => ({
    src: url,
    alt: `${leaserEmail} , ${address}}`,
  }));

  return (
    <Col sm={12} lg={4}>
      <Button
        variant="wrapper"
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
