import React, { FunctionComponent } from 'react';
import styles from './FilledImage.module.scss';
import classNames from 'classnames';

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  src: string;
  alt?: string;
}

const Image: FunctionComponent<Props> = ({
  src,
  alt,
  className,
  style,
  ...divProps
}) => {
  return (
    <div
      {...divProps}
      className={classNames(styles.image, className)}
      style={{ backgroundImage: `url("${src}")`, ...style }}
    >
      <img src="NA" className={styles.hiddenImage} alt={alt} />
    </div>
  );
};

export default Image;
