import React, { FunctionComponent } from 'react';
import styles from './ToggleSwitchItem.module.scss';
import cn from 'classnames';

interface ToggleSwitchItemProps {
  isActive: boolean;
  onSwitch: () => void;
}

const ToggleSwitchItem: FunctionComponent<ToggleSwitchItemProps> = ({
  isActive,
  onSwitch,
  children,
}) => (
  <div
    className={cn(styles[isActive ? 'active' : 'inactive'], styles.switchItem)}
    onClick={isActive ? undefined : onSwitch}
  >
    {children}
  </div>
);

export default ToggleSwitchItem;
