import React, { FunctionComponent } from 'react';
import { Icon as IconType } from '@icons';
import styles from './Chip.module.scss';
import cn from 'classnames';
import { miscIcons } from '@icons';

export type ChipState = 'default' | 'hover' | 'disabled';

export interface ChipProps {
  state: Partial<ChipState>;
  text: string;
  dismiss: boolean;
  onClose?: () => void;
  icon?: IconType;
}

const Chip: FunctionComponent<ChipProps> = ({ state, icon, text, dismiss }) => {
  const Icon = icon;
  return (
    <div
      className={cn(styles.chip, styles[state], {
        [styles.chipWithIcon]: !!icon,
      })}
    >
      {!!Icon && (
        <div>
          <Icon />
        </div>
      )}
      <div className={cn({ [styles.opacity]: state === 'disabled' })}>
        {text}
      </div>
      {dismiss && (
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
