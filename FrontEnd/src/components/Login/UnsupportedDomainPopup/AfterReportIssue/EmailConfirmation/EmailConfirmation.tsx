import React, { FunctionComponent } from 'react';
import { Modal, Button, Subtitle1 } from '@basics';
import { useDispatch } from 'react-redux';
import { useShowEmailConfirmation, hideEmailConfirmation } from '@redux';
import { miscIcons, unsupportedDomainPopup } from '@icons';
import styles from './EmailConfirmation.module.scss';
import cn from 'classnames';

const EmailConfirmation: FunctionComponent = () => {
  const dispatch = useDispatch();
  const shouldShowEmailConfirmation = useShowEmailConfirmation();

  return (
    <Modal
      open={shouldShowEmailConfirmation}
      onClose={() => dispatch(hideEmailConfirmation())}
      className={styles.wrapper}
      title="Email sent!"
      caption="Thanks for reporting. We hope to get back to you within 7 days."
      ModalGraphic={{
        src: unsupportedDomainPopup.emailSent,
        alt: 'Email Sent',
      }}
    >
      <></>
      <div className={cn(styles.emailConfirmationWrapper)}>
        <Button
          className={styles.bottomButton}
          variant="solid"
          size="secondary"
          onClick={() => {
            dispatch(hideEmailConfirmation());
          }}
        >
          Okay
        </Button>
      </div>
    </Modal>
  );
};

export default EmailConfirmation;
