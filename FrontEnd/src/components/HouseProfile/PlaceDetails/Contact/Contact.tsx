import React, { FunctionComponent } from 'react';
import styles from './Contact.module.scss';
import { useLandlordRoomData } from '@hooks';
import { Body1, Body2, Link } from '@basics';
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

  const { name } = data;

  const email = 'lajollablue@greystar.com';
  const websiteUrl = 'https://www.lajollablueliving.com';

  return (
    <div className={styles.wrapper}>
      {/* TODO need to put apartment icon here */}
      Icon Here
      <div className={styles.textWrapper}>
        <Body1 className={styles.title}>Contact {name}</Body1>

        <Body2 className={styles.contactInfo}>
          {/* TODO this is a fake phone number */}
          <contactIcons.phone /> (866) 559-8471
        </Body2>

        <div className={styles.contactInfo}>
          {/* TODO this is a fake email */}
          <Link href={`mailto:${email}`} external>
            <contactIcons.email /> {email}
          </Link>
        </div>

        <div className={styles.contactInfo}>
          {/* TODO this is a fake website url */}
          <Link href={`${websiteUrl}`} external>
            <contactIcons.internetGlobe /> {websiteUrl}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
