import { Button, Modal, Subtitle2 } from '@basics';
import { unsupportedDomainPopup } from '@icons';
import {
  hideUnsupportedDomainPopup,
  showLogin,
  showReportIssue,
  useShowUnsupportedDomainPopup,
  useThunkDispatch,
} from '@redux';
import React, { FunctionComponent } from 'react';
import AfterReportIssue from './AfterReportIssue';
import EmailConfirmation from './AfterReportIssue/EmailConfirmation';
import styles from './UnsupportedDomainPopup.module.scss';

const UnsupportedDomainPopupUI: FunctionComponent = () => {
  const dispatch = useThunkDispatch();
  const shouldShowUnsupportedDomainPopup = useShowUnsupportedDomainPopup();

  return (
    <Modal
      open={shouldShowUnsupportedDomainPopup}
      onClose={() => dispatch(hideUnsupportedDomainPopup())}
      className={styles.wrapper}
      title="Oops, your email is incorrect..."
      ModalGraphic={{
        src: unsupportedDomainPopup.triton,
        alt: 'LogInNotSupported',
      }}
    >
      <div className={styles.onlyUCSDText}>
        At the moment, we only allow email ends with <b>ucsd.edu</b> to sign up!
      </div>

      <div className={styles.bottomRowButtons}>
        <Button
          className={styles.tryAgainButton}
          size="secondary"
          variant="wrapper"
          onClick={() => {
            dispatch(hideUnsupportedDomainPopup());
            dispatch(showReportIssue());
          }}
        >
          <div className={styles.reportIssue}>
            <Subtitle2>Report an issue</Subtitle2>
          </div>
        </Button>

        <Button
          className={styles.tryAgainButton}
          size="secondary"
          onClick={() => {
            dispatch(hideUnsupportedDomainPopup());
            dispatch(showLogin());
          }}
        >
          Try Again
        </Button>
      </div>
    </Modal>
  );
};

const UnsupportedDomainPopup: FunctionComponent = () => (
  <>
    <UnsupportedDomainPopupUI />
    <AfterReportIssue />
    <EmailConfirmation />
  </>
);

export default UnsupportedDomainPopup;
