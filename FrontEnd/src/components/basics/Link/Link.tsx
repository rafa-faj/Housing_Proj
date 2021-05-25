// TODO need to merge this to work with next/link

import React, {
  FunctionComponent,
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react';
import styles from './Link.module.scss';
import cn from 'classnames';

export type LinkProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Link: FunctionComponent<LinkProps> = ({ className, ...props }) => (
  <div className={cn(className, styles.link)} {...props} />
);

export default Link;
