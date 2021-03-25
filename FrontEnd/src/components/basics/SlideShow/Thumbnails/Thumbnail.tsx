import React, { FunctionComponent } from 'react';
import { SlideShowItem } from '../SlideShow';
import styles from './Thumbnails.module.scss';
import classNames from 'classnames';
import Image from '../Image/Image';

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
    className={classNames(className, {
      [styles.selectedPreview]: active,
    })}
  >
    <Image src={image.src} alt={image.alt} />
  </button>
);

export default Thumbnail;
