import React, {
  FunctionComponent,
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react';
import styles from './Subtitle.module.scss';
import cn from 'classnames';

export type Subtitle2Props = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Subtitle2: FunctionComponent<Subtitle2Props> = ({
  className,
  ...props
}) => <div className={cn(className, styles.subtitle2)} {...props} />;

export default Subtitle2;
