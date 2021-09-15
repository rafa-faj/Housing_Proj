import React, { useState, FunctionComponent } from 'react';
import styles from './CheckBoxButton.module.scss';
import { checkboxIcons } from '@icons';
import { useRandomID } from '@hooks';

export interface CheckBoxButtonProps {
  id?: string;
  value: string;
  withLabel: boolean;
  onChange?: (value: string, state: boolean) => void;
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
  const [checked, changeState] = useState(!!defaultChecked);
  return (
    <div className="d-flex" id={buttonID}>
      {checked ? (
        <checkboxIcons.checked
          className={styles.checkbox}
          onClick={() => {
            changeState(false);
            if (onChange) {
              onChange(value, false);
            }
          }}
        />
      ) : (
        <div
          className={styles.notChecked}
          onClick={() => {
            changeState(true);
            if (onChange) {
              onChange(value, true);
            }
          }}
        ></div>
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
