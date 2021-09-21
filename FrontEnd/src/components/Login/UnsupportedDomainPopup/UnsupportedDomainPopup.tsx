import React, { FunctionComponent } from 'react';
import { Modal, Button, Subtitle1 } from '@basics';
import { useDispatch } from 'react-redux';
import {
  useShowUnsupportedDomainPopup,
  hideUnsupportedDomainPopup,
  showReportIssue,
  showLogin,
  useThunkDispatch,
} from '@redux';
import { miscIcons } from '@icons';
import styles from './UnsupportedDomainPopup.module.scss';
import AfterReportIssue from './AfterReportIssue';
import EmailConfirmation from './AfterReportIssue/EmailConfirmation';

const UnsupportedDomainPopupUI: FunctionComponent = () => {
  const dispatch = useThunkDispatch();
  const shouldShowUnsupportedDomainPopup = useShowUnsupportedDomainPopup();

  return (
    <Modal
      open={shouldShowUnsupportedDomainPopup}
      onClose={() => dispatch(hideUnsupportedDomainPopup())}
      className={styles.wrapper}
      title="Oops, your email is incorrect..."
      modalGraphic={miscIcons.triton}
    >
      <Subtitle1>
        At the moment, we only allow email ends with <b>ucsd.edu</b> to sign up!
      </Subtitle1>

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
            <div>Report an issue</div>
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
