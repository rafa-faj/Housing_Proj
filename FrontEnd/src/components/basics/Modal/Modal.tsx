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
  // default keepMounted is true (necessary for SSR/nextjs, so that it will be sent to client)
  keepMounted = true,
  ...passedProps
}) => {
  return (
    <MaterialUIModal
      open={open}
      keepMounted={keepMounted}
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
