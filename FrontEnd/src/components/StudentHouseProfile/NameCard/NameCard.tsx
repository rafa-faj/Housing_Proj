import React, { FunctionComponent, useState } from 'react';
import styles from './NameCard.module.scss';
import { FilledImage, Button, Tooltip } from '@basics';
import { contactIcons } from '@icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch } from 'react-redux';
import { showLogin } from '@redux';

interface NameCardProps {
  userName: string;
  major: string;
  schoolYear: string;
  userBio: string;
  userEmail: string;
  userPhone: string;
  userPhoto: string;
  isLoggedIn: boolean;
}

// todo: make dot a basic component

const NameCard: FunctionComponent<NameCardProps> = ({
  userName,
  major,
  schoolYear,
  userBio,
  userPhoto,
  isLoggedIn,
  userEmail,
  userPhone,
}) => {
  const dispatch = useDispatch();
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  return (
    <div className={styles.orangeBox}>
      <div className="d-flex align-items-center">
        <FilledImage
          src={userPhoto}
          alt={`${userName}'s photo`}
          className={styles.userPhoto}
        />
        <div className={styles.userInfo}>
          <div className={styles.userName}>{userName}</div>
        </div>
        <div className={styles.contactWrapper}>
          {isLoggedIn ? (
            <div>
              <Tooltip
                isSingleLine
                hideInfoIcon
                title="Copied to clipboard!"
                className={styles.copy}
                placement="top"
                open={copiedPhone}
                onClose={() => setCopiedPhone(false)}
              >
                <CopyToClipboard
                  text={userPhone}
                  onCopy={() => setCopiedPhone(true)}
                >
                  <div className="d-flex">
                    <contactIcons.phone className="mr-1" />
                    {userPhone}
                  </div>
                </CopyToClipboard>
              </Tooltip>
              <Tooltip
                isSingleLine
                hideInfoIcon
                title="Copied to clipboard!"
                className={styles.copy}
                placement="top"
                open={copiedEmail}
                onClose={() => setCopiedEmail(false)}
              >
                <CopyToClipboard
                  text={userEmail}
                  onCopy={() => setCopiedEmail(true)}
                >
                  <div className="d-flex">
                    <contactIcons.email className="mr-1" />
                    {userEmail}
                  </div>
                </CopyToClipboard>
              </Tooltip>
            </div>
          ) : (
            <Button
              variant="outline"
              className={styles.contactButton}
              onClick={() => dispatch(showLogin())}
            >
              Contact
            </Button>
          )}
        </div>
      </div>
      <div className={styles.userBasicInfo}>
        {schoolYear} <span className={styles.dot}></span> {major}{' '}
      </div>
      <div className={styles.userBio}>{userBio}</div>
    </div>
  );
};

export default NameCard;
