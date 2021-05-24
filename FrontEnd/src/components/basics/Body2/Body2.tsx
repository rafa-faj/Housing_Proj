import React, {
  FunctionComponent,
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react';
import styles from './Body.module.scss';
import cn from 'classnames';

export type Body2Props = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Body2: FunctionComponent<Body2Props> = ({ className, ...props }) => (
  <div className={cn(className, styles.body2)} {...props} />
);

export default Body2;
