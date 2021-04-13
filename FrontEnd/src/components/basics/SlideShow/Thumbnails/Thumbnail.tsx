import React, { FunctionComponent } from 'react';
import { SlideShowItem } from '../SlideShow';
import styles from './Thumbnails.module.scss';
import cn from 'classnames';
import Image from '../../FilledImage/FilledImage';

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
  <button
    type="button"
    {...buttonProps}
    className={cn(className, {
      [styles.selectedPreview]: active,
    })}
  >
    <Image src={image.src} alt={image.alt} />
  </button>
);

export default Thumbnail;
