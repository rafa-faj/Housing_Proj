import React, { useState, FunctionComponent } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { carouselIcons } from '@icons';
import Thumbnails from './Thumbnails/Thumbnails';
import SlideShowItem from './SlideShowItem/SlideShowItem';
import styles from './SlideShow.module.scss';
import classNames from 'classnames';

export interface SlideShowItem {
  src: string;
  alt: string;
}

interface PathProps {
  images: SlideShowItem[];
  onImageClick?: (index: number) => any;
  className?: string;
  showPreview?: boolean;
}

const SlideShow: FunctionComponent<PathProps> = ({
  images,
  onImageClick,
  className,
  showPreview,
}) => {
  // need to track animation so the user cannot click on a preview during animation
  const [animating, setAnimating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={classNames(styles.slideshow, className)}>
      <Carousel
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
        nextIcon={<carouselIcons.rightArrow />}
        prevIcon={<carouselIcons.leftArrow />}
        interval={null} // no interval
        indicators={!showPreview}
        className={classNames({
          [styles.preview]: showPreview,
          [styles.carouselOverflow]: images.length > 5,
        })}
      >
        {images.map(({ src, alt }, index) => (
          <SlideShowItem
            src={src}
            alt={alt}
            onClick={onImageClick && (() => onImageClick(index))}
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
          />
        ))}
      </Carousel>

      {showPreview && (
        <Thumbnails
          images={images}
          activeIndex={activeIndex}
          overflow={images.length > 5}
          onClick={(index) => !animating && setActiveIndex(index)}
        />
      )}
    </div>
  );
};

export default SlideShow;

export const testSlideShow: SlideShowItem[] = [
  {
    src:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bedroom-ideas-rds-work-queens-road-08-1593114639.jpg',
    alt: 'First slide',
  },
  {
    src:
      'https://curatedinterior.com/wp-content/uploads/2019/05/Neutral-gray-bedroom-via-@jessicamendesdesign.jpg',
    alt: 'Second slide',
  },
  {
    src:
      'https://st.hzcdn.com/simgs/pictures/bedrooms/abbot-ave-unit-h-christopher-lee-foto-img~1131a6990e8f8fcb_14-3211-1-404364d.jpg',
    alt: 'Third slide',
  },
];
