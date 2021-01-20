import React, { useState, useEffect, FunctionComponent } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import { Icon as IconType, IconProps } from '@icons';
import cn from 'classnames';
import styles from './Toggle.module.scss';

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

const Toggle: FunctionComponent<ToggleProps> = ({
  label,
  hideLabel,
  icon: Icon,
  iconConfig,
  selected,
  initialSelected = false,
  className,
  onClick,
  children,
  ...buttonProps
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(initialSelected);

  useEffect(() => {
    if (selected !== undefined) setIsSelected(selected);
  }, [selected]);

  return (
    <div className={styles.root}>
      <Button
        variant="" // TODO
        {...buttonProps}
        className={cn(className, styles.toggle, {
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
    </div>
  );
};

export default Toggle;
