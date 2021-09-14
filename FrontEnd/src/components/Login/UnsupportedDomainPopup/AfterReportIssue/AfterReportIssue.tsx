import React, { FunctionComponent, useState } from 'react';
import { Modal, Button, Input } from '@basics';
import { useDispatch } from 'react-redux';
import {
  useShowReportIssue,
  hideReportIssue,
  showEmailConfirmation,
  useThunkDispatch,
} from '@redux';
import { contactIcons, miscIcons } from '@icons';
import styles from './AfterReportIssue.module.scss';
import * as z from 'zod';
import { sendEmail } from '@apis';

const e = z.string().email('Email is not in a valid format.');

const AfterReportIssue: FunctionComponent = () => {
  const dispatch = useThunkDispatch();
  const shouldShowReportIssue = useShowReportIssue();
  const [userEmail, setEmail] = useState('');
  const validEmail = e.safeParse(userEmail).success;

  return (
    <Modal
      open={shouldShowReportIssue}
      onClose={() => dispatch(hideReportIssue())}
      className={styles.wrapper}
    >
      <div>
        <Button variant="wrapper" onClick={() => dispatch(hideReportIssue())}>
          <miscIcons.orangeX />
        </Button>
      </div>

      <div className={styles.reportIssueWrapper}>
        <div>
          <img
            className={styles.loginImg}
            src="/triton.svg"
            alt="LogInNotSupported"
          />
        </div>
        <h4 className={styles.reportIssueLabel}>
          Issue logging in? Report it to us
        </h4>
        <div className={styles.inputWrapper}>
          <Input
            icon={{ icon: contactIcons.email }}
            placeholder="Please input your UCSD email"
            onChange={(event) => setEmail(event.target.value)}
            isValid={validEmail}
          />
        </div>

        <Button
          className={styles.sendReportButton}
          variant="solid"
          size="secondary"
          disabled={!validEmail}
          onClick={async () => {
            if (!validEmail) return;

            await sendEmail(userEmail);
            await dispatch(hideReportIssue());
            dispatch(showEmailConfirmation());
          }}
        >
          Send report
        </Button>
      </div>
    </Modal>
  );
};

export default AfterReportIssue;