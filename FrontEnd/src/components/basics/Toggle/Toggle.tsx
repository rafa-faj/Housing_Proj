import React, { useState, useEffect } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import { Icon as IconType, IconProps } from '../../../assets/icons/all';
import classNames from 'classnames';
import styles from './Input.module.scss';

interface ToggleProps extends Omit<ButtonProps, 'onClick'> {
  label: string;
  hideLabel?: boolean;
  icon?: IconType;
  iconConfig?: IconProps;
  selected?: boolean;
  initialSelected?: boolean;
  onClick?: (
    selected: boolean,
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => any;
}

const Toggle: React.FC<ToggleProps> = ({
  label,
  hideLabel,
  icon,
  iconConfig,
  selected,
  initialSelected = false,
  className,
  onClick,
  children,
  ...buttonProps
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(initialSelected);
  const [Icon, setIcon] = useState<IconType | undefined>(icon);

  useEffect(() => {
    if (selected !== undefined) setIsSelected(selected);
  }, [selected]);

  useEffect(() => {
    setIcon(icon);
  }, [icon]);

  return (
    <Button
      variant="" // TODO
      {...buttonProps}
      className={classNames(className, {
        [styles.selected]: isSelected,
        [styles.unselected]: !isSelected,
      })}
      onClick={(e) => {
        if (onClick) onClick(!isSelected, e);
        setIsSelected(!isSelected);
      }}
    >
      {Icon && (
        <div>
          <Icon {...iconConfig} />
        </div>
      )}

      {!hideLabel && <div>{label}</div>}

      {children}
    </Button>
  );
};

export default Toggle;
