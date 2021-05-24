import React, {
  FunctionComponent,
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react';
import styles from './Body.module.scss';
import cn from 'classnames';

export type Body1Props = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Body1: FunctionComponent<Body1Props> = ({ className, ...props }) => (
  <div className={cn(className, styles.body1)} {...props} />
);

export default Body1;
