import React, { FunctionComponent } from 'react';
import { SlideShowItem } from '../SlideShow';
import styles from './Thumbnails.module.scss';
import cn from 'classnames';
import { Button, FilledImage } from '@basics';

interface ThumbnailProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  image: SlideShowItem;
  active?: boolean;
}

const Thumbnail: FunctionComponent<ThumbnailProps> = ({
  image,
  active,
  className,
  ...buttonProps
}) => (
  <Button
    variant="wrapper"
    {...buttonProps}
    className={cn(
      className,
      {
        [styles.selectedPreview]: !active,
      },
      'd-flex',
    )}
  >
    <FilledImage src={image.src} alt={image.alt} />
  </Button>
);

export default Thumbnail;
