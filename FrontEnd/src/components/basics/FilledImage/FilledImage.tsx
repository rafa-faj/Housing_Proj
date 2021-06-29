import React, { FunctionComponent } from 'react';
import styles from './FilledImage.module.scss';
import cn from 'classnames';

type SafariContainerProps = Pick<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'className' | 'style'
>;

/**
 * Wrapper to provide FilledImage functionality in older browsers
 * (including Safari version 13).
 *
 * Current theory for the core issue is that safari v13 doesn't
 * allow `background-size: cover;` within non absolute elements.
 * So we wrap the `background-size: cover;` with an absolute
 * element and wrap that one with a relatively positioned element.
 */
const SafariContainer: FunctionComponent<SafariContainerProps> = ({
  className,
  style,
  children,
}) => (
  <div className={cn(styles.relativeWrapper, className)} style={style}>
    <div className={cn(styles.absoluteWrapper, className)} style={style}>
      {children}
    </div>
  </div>
);

interface FilledImageProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  src: string;
  alt?: string;
}

/**
 * FilledImage uses the `src` prop provided as the `background-image`
 * of a `div` with `background-size: cover;`. This simulates
 * an image that fills the provided height/width without
 * stretching.
 *
 * It also provides a hidden image with the same `src` and provided `alt`
 * for any browser/scraping/accessibility reasons.
 *
 * SafariContainer is necessary for FilledImage's support in Safari version 13
 * (and potentially untested older browsers too).
 */
const FilledImage: FunctionComponent<FilledImageProps> = ({
  src,
  alt,
  className,
  style,
  ...divProps
}) => (
  <SafariContainer className={className} style={style}>
    <div
      {...divProps}
      className={cn(styles.image, className)}
      style={{ backgroundImage: `url("${src}")`, ...style }}
    >
      <img src={src} className={styles.hiddenImage} alt={alt} />
    </div>
  </SafariContainer>
);

export default FilledImage;
