import React, { FunctionComponent, ReactElement } from 'react';
import MaterialUITooltip, {
  TooltipProps as MaterialUITooltipProps,
} from '@material-ui/core/Tooltip';
import { miscIcons } from '@icons';
import { Body2, Caption } from '@basics';
import styles from './Tooltip.module.scss';

export interface TooltipProps extends Omit<MaterialUITooltipProps, 'children'> {
  hideInfoIcon?: boolean; // hides the info icon
  children?: ReactElement<any, any> | string;
}

/**
 * The Info Icon with styling.
 */
const InfoIcon: FunctionComponent = () => (
  <div className={styles.infoIcon}>
    <miscIcons.infoCircle />
  </div>
);

/**
 * Wrapper for the actual popup component to provide the correct styling.
 */
const PopperWrapper: FunctionComponent = ({ children }) => (
  <div className={styles.tooltip}>
    <Body2>{children}</Body2>
  </div>
);

/**
 * Tooltip. `title` is what will appear in the popup. `children` is what the popup will
 * listen to for hovering.
 */
const Tooltip: FunctionComponent<TooltipProps> = ({
  hideInfoIcon,
  children,
  title,
  classes,
  ...props
}) => (
  <MaterialUITooltip
    title={<PopperWrapper>{title}</PopperWrapper>}
    classes={{ ...{ tooltip: styles.MUITooltip }, ...classes }}
    {...props}
  >
    <div className={styles.wrapper}>
      {!hideInfoIcon && <InfoIcon />}
      <Caption className={styles.childrenWrapper}>{children}</Caption>
    </div>
  </MaterialUITooltip>
);

export default Tooltip;
