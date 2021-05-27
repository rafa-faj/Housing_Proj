import React, { FunctionComponent } from 'react';
import { CarouselItem, CarouselItemProps } from 'reactstrap';
import cn from 'classnames';
import Image from '../../FilledImage/FilledImage';
import styles from './SlideShowItem.module.scss';
import { Button } from '@basics';

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
      className={cn(styles.item, className)}
    >
      {onClick ? (
        <Button
          variant="wrapper"
          className="w-100 h-100"
          onClick={onClick}
          onKeyDown={({ key }) => key === 'Enter' && onClick()}
        >
          {imageElement}
        </Button>
      ) : (
        imageElement
      )}
    </CarouselItem>
  );
};

export default SlideShowItem;
