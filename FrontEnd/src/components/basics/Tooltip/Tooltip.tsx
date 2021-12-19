import React, { FunctionComponent, ReactElement } from 'react';
import MaterialUITooltip, {
  TooltipProps as MaterialUITooltipProps,
} from '@material-ui/core/Tooltip';
import { miscIcons } from '@icons';
import cn from 'classnames';
import { Body2, Caption } from '@basics';
import styles from './Tooltip.module.scss';
import { makeStyles } from '@material-ui/core/styles';
import { Optional } from 'utility-types';

export interface TooltipProps
  extends Optional<MaterialUITooltipProps, 'children'> {
  hideInfoIcon?: boolean; // hides the info icon
  isSingleLine: boolean;
  title: string | React.ReactFragment;
  maxWidth?: number;
}

export interface PopperWrapperProps {
  isSingleLine: boolean;
}

var useStyles = (width: number) =>
  makeStyles(() => ({
    customWidth: {
      maxWidth: width,
    },
  }));

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
const PopperWrapper: FunctionComponent<PopperWrapperProps> = ({
  isSingleLine,
  children,
}) => {
  return (
    <div
      className={cn(styles.tooltip, {
        [styles.tooltipSingleLine]: isSingleLine,
      })}
    >
      <Body2 className={styles.tooltipText}>{children}</Body2>
    </div>
  );
};

/**
 * Tooltip. `title` is what will appear in the popup. `children` is what the popup will
 * listen to for hovering.
 */
const Tooltip: FunctionComponent<TooltipProps> = ({
  hideInfoIcon,
  children = '',
  title = '',
  isSingleLine,
  maxWidth = 300,
  className,
  ...props
}) => {
  const classes = useStyles(maxWidth)();

  return (
    <MaterialUITooltip
      title={<PopperWrapper isSingleLine={isSingleLine}>{title}</PopperWrapper>}
      classes={{
        tooltip: cn(classes.customWidth, styles.MUITooltip),
      }}
      {...props}
    >
      <div className={cn(styles.wrapper, className)}>
        {!hideInfoIcon && <InfoIcon />}
        <Caption className={styles.childrenWrapper}>{children}</Caption>
      </div>
    </MaterialUITooltip>
  );
};

export default Tooltip;
