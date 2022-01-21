import React, { FunctionComponent, useEffect, useState } from 'react';
import styles from './ToggleSwitchBar.module.scss';
import ToggleSwitchItem from './ToggleSwitchItem';

interface ToggleSwitchBarProps {
  onSwitchLeft: () => void;
  onSwitchRight: () => void;
  leftText: string;
  rightText: string;
  defaultRight?: boolean;
}

const ToggleSwitchBar: FunctionComponent<ToggleSwitchBarProps> = ({
  onSwitchLeft,
  onSwitchRight,
  leftText,
  rightText,
  defaultRight,
}) => {
  const [leftActive, setLeftActive] = useState(!defaultRight);

  useEffect(() => {
    setLeftActive(!defaultRight);
  }, [defaultRight]);

  return (
    <div className={styles.switchWrapper}>
      <ToggleSwitchItem
        onSwitch={() => {
          onSwitchLeft();
          setLeftActive(true);
        }}
        isActive={leftActive}
      >
        {leftText}
      </ToggleSwitchItem>
      <ToggleSwitchItem
        onSwitch={() => {
          onSwitchRight();
          setLeftActive(false);
        }}
        isActive={!leftActive}
      >
        {rightText}
      </ToggleSwitchItem>
    </div>
  );
};

export default ToggleSwitchBar;
