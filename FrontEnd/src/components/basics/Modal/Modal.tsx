import React, {
  FunctionComponent,
  ReactElement,
  MouseEventHandler,
} from 'react';
import {
  default as MaterialUIModal,
  ModalProps as MaterialUIModalProps,
} from '@material-ui/core/Modal';
import cn from 'classnames';
import styles from './Modal.module.scss';
import { Subtitle1, Button } from '@basics';
import { miscIcons, Icon } from '@icons';

interface ModalProps
  extends Omit<MaterialUIModalProps, 'disableBackdropClick' | 'children'> {
  children?: (ReactElement | undefined | false)[];
  size?: 'md' | 'lg';
  title?: string;
  caption?: string;
  modalGraphic?: Icon;
  topBar: ReactElement | undefined | false;
  parentClassName?: string;
}

/**
 * Modal component. Used for popups. size is 'md' (medium) by default
 *
 * Can optionally provide a a modalGraphic, a visual/image for the popup,
 * a title, displayed under modal graphic (if provided), and a caption,
 * brief explanation of modal.
 *
 * children can be additional buttons/components unique to specific modal
 *
 * onClose needs to be provied in order to close the popup (with either
 * the exit button or esc)
 *
 */
const Modal: FunctionComponent<ModalProps> = ({
  title,
  caption,
  modalGraphic: ModalGraphic,
  children,
  onClose,
  open,
  className,
  size = 'md',
  topBar,
  // default keepMounted is true (necessary for SSR/nextjs, so that it will be sent to client)
  keepMounted = true,
  parentClassName,
  ...passedProps
}) => {
  return (
    <MaterialUIModal
      onClose={onClose}
      open={open}
      keepMounted={keepMounted}
      {...passedProps}
      className={cn(styles.materialUIModal, parentClassName)}
      disableBackdropClick
    >
      <div className={cn(styles.modal, styles[size], className)}>
        {topBar || (
          <div>
            <Button
              variant="wrapper"
              className={styles.close}
              onClick={onClose as MouseEventHandler<HTMLButtonElement>}
            >
              <miscIcons.orangeX />
            </Button>
          </div>
        )}

        {ModalGraphic && (
          <div className={styles.modalGraphic}>
            <ModalGraphic />
          </div>
        )}

        {title && (
          <div className={cn(styles.text, styles.title)}>
            <Subtitle1>{title}</Subtitle1>
          </div>
        )}

        {caption && (
          <div className={cn(styles.text, styles.caption)}>{caption}</div>
        )}

        {children}
      </div>
    </MaterialUIModal>
  );
};

export default Modal;
