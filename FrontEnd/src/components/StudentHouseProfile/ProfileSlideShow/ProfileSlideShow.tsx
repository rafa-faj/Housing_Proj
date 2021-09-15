import React, { FunctionComponent } from 'react';
import { SlideShow, SlideShowItem } from '@basics';
import styles from './ProfileSlideShow.module.scss';

interface ProfileSlideShowProps {
  photos: SlideShowItem[];
}

const ProfileSlideShow: FunctionComponent<ProfileSlideShowProps> = ({
  photos,
}) => {
  return <SlideShow images={photos} showPreview className={styles.slideShow} />;
};

export default ProfileSlideShow;
