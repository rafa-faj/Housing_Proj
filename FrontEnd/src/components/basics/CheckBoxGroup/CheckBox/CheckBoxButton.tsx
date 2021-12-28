import React, { useState, FunctionComponent } from 'react';
import styles from './CheckBoxButton.module.scss';
import { checkboxIcons } from '@icons';
import { useRandomID } from '@hooks';

export interface CheckBoxButtonProps {
  id?: string;
  value: string;
  withLabel?: boolean;
  onChange?: (state: boolean) => void;
  defaultChecked?: boolean;
}

const CheckBoxButton: FunctionComponent<CheckBoxButtonProps> = ({
  id,
  value,
  withLabel,
  onChange,
  defaultChecked,
}) => {
  const buttonID = useRandomID(id);
  const [checked, setChecked] = useState(!!defaultChecked);
  const onClick = () => {
    setChecked(!checked);
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <div className="d-flex" id={buttonID}>
      {checked ? (
        <checkboxIcons.checked className={styles.checkbox} onClick={onClick} />
      ) : (
        <div className={styles.notChecked} onClick={onClick}></div>
      )}
      {withLabel && (
        <label htmlFor={buttonID}>
          <div className={styles.CheckBoxLabelBody}>{value}</div>
        </label>
      )}
    </div>
  );
};

export default CheckBoxButton;
