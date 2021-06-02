import React, { FunctionComponent } from 'react';
import styles from './Contact.module.scss';
import { useLandlordRoomData } from '@hooks';
import { Body1, Body2, Link, FilledImage } from '@basics';
import { contactIcons } from '@icons';

interface ContactProps {
  roomId: number;
}

const Contact: FunctionComponent<ContactProps> = ({ roomId }) => {
  const { data, error } = useLandlordRoomData(roomId);

  if (error) {
    return <div>Error occurred!</div>; // TODO handle error in a different way
  }

  if (!data) {
    return <div>Loading Contact Information...</div>; // TODO add a loader
  }

  const { name, website, phone, email, icon } = data;

  return (
    <div className={styles.wrapper}>
      <div>
        <FilledImage
          src={icon}
          alt={`${name}'s icon`}
          className={styles.landlordProfile}
        />
      </div>

      <div className={styles.textWrapper}>
        <Body1 className={styles.title}>Contact {name}</Body1>

        <Body2 className={styles.contactInfo}>
          <contactIcons.phone /> {phone}
        </Body2>

        <div className={styles.contactInfo}>
          <Link href={`mailto:${email}`} external>
            <Body2>
              <contactIcons.email /> Email
            </Body2>
          </Link>
        </div>

        <div className={styles.contactInfo}>
          <Link href={website} external>
            <Body2>
              <contactIcons.internetGlobe /> Website
            </Body2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
