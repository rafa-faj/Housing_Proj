import React, { FunctionComponent } from 'react';
import { Icon as IconType } from '@icons';
import styles from './Chip.module.scss';
import cn from 'classnames';
import { miscIcons } from '@icons';

export type ChipState = 'default' | 'hover' | 'disabled';

export interface ChipProps {
  state: ChipState;
  text: string;
  shouldDismiss: boolean;
  onClose?: () => any;
  icon?: IconType;
}

const Chip: FunctionComponent<ChipProps> = ({
  state,
  icon: Icon,
  text,
  shouldDismiss,
}) => {
  return (
    <div
      className={cn(styles.chip, styles[state], {
        [styles.chipWithIcon]: Icon,
      })}
    >
      {Icon && (
        <div>
          <Icon />
        </div>
      )}
      <div className={cn({ [styles.opacity]: state === 'disabled' })}>
        {text}
      </div>
      {shouldDismiss && (
        <div
          className={cn(styles.cross, {
            [styles.opacity]: state === 'disabled',
          })}
        >
          <miscIcons.orangeX />
        </div>
      )}
    </div>
  );
};

export default Chip;
