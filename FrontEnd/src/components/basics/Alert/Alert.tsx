import React, { FunctionComponent } from 'react';
import { Icon as IconType, alertIcons } from '@icons';
import styles from './Alert.module.scss';
import Button from '@components/basics/Button';
import cn from 'classnames';

export type alertVariant = 'success' | 'alert' | 'warning' | 'info';

interface AlertProps {
  variant: alertVariant;
  title?: string;
  text: string;
  button?: string;
  onClick?: () => void;
}

const iconMapping = {
  success: alertIcons.Check,
  alert: alertIcons.Alert,
  warning: alertIcons.Ring,
  info: alertIcons.Info,
};

const Alert: FunctionComponent<AlertProps> = ({
  variant,
  title = '',
  text,
  button = '',
  children,
  onClick,
}) => {
  let Icon = iconMapping[variant];

  return (
    <div className={cn(styles[variant], styles.alertContainer)}>
      <div>
        <Icon />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.text}>{text}</div>
      </div>
      <div className={styles.button}>
        {children}
        {button === '' ? (
          <alertIcons.X />
        ) : (
          <Button
            variant="wrapper"
            size="secondary"
            className={styles[variant]}
            onClick={onClick}
          >
            {button}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Alert;
