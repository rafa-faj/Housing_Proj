import React, { FunctionComponent, ReactElement } from 'react';
import {
  default as MaterialUIModal,
  ModalProps as MaterialUIModalProps,
} from '@material-ui/core/Modal';
import cn from 'classnames';
import styles from './Modal.module.scss';

interface ModalProps
  extends Omit<MaterialUIModalProps, 'disableBackdropClick' | 'children'> {
  children?: (ReactElement | undefined | false)[];
  size?: 'md' | 'lg';
}

const Modal: FunctionComponent<ModalProps> = ({
  children,
  open,
  className,
  size = 'md',
  ...passedProps
}) => {
  return (
    // default keepMounted is true for SSR in nextjs (necessary to be sent to client). Can be overridden (from passedProps)
    <MaterialUIModal
      open={open}
      keepMounted
      {...passedProps}
      className={styles.materialUIModal}
      disableBackdropClick
    >
      <div className={cn(styles.modal, styles[size], className)}>
        <>{children}</>
      </div>
    </MaterialUIModal>
  );
};

export default Modal;
