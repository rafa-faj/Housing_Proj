import React, {
  FunctionComponent,
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react';
import styles from './Subtitle.module.scss';
import cn from 'classnames';

export type Subtitle1Props = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Subtitle1: FunctionComponent<Subtitle1Props> = ({
  className,
  ...props
}) => <div className={cn(className, styles.subtitle1)} {...props} />;

export default Subtitle1;
