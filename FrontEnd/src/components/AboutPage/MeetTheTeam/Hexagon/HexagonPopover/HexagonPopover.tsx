import React, { FunctionComponent, ReactNode } from 'react';
import styles from './Hexagon.module.scss';
import { Tooltip } from '@basics';

interface HexagonDetailLinks {
  portfolio?: string;
  email?: string;
  linkedIn?: string;
}

export interface HexagonDetails {
  title: string;
  subtitle: string;
  description: string;
  links: HexagonDetailLinks;
}

interface HexagonPopoverProps {
  details: HexagonDetails;
}

const HexagonPopover: FunctionComponent<HexagonPopoverProps> = ({
  children,
  details,
}) => {
  const { title, subtitle, description, links } = details;

  // TODO `className` is the wrong prop to use for the tooltip div wrapper (i think...)
  // TODO either need to pass a classname thorugh to the popper wrapper OR allow for a custom popper wrapper
  return (
    <Tooltip className={styles.tooltip} title={<div></div>} hideInfoIcon>
      {children}
    </Tooltip>
  );
};

export default HexagonPopover;
