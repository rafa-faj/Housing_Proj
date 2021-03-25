import React, { FunctionComponent } from 'react';
import { CarouselItem, CarouselItemProps } from 'reactstrap';
import styles from './SlideShow.module.scss';
import classNames from 'classnames';
import Image from './Image/Image';

interface SlideShowItemProps extends CarouselItemProps {
  src: string;
  alt: string;
  onClick?: () => any;
}

const SlideShowItem: FunctionComponent<SlideShowItemProps> = ({
  src,
  alt,
  onClick,
  className,
  ...carouselItemProps
}) => {
  const imageElement = <Image src={src} alt={alt} />;

  return (
    <CarouselItem
      {...carouselItemProps}
      key={src}
      className={classNames(styles.item, className)}
    >
      {onClick ? (
        <button
          className="no-show w-100 h-100"
          type="button"
          onClick={onClick}
          onKeyDown={({ key }) => key === 'Enter' && onClick()}
        >
          {imageElement}
        </button>
      ) : (
        imageElement
      )}
    </CarouselItem>
  );
};

export default SlideShowItem;
