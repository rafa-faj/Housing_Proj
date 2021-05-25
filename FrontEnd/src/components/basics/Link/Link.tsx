import React, { FunctionComponent } from 'react';
import styles from './Link.module.scss';
import cn from 'classnames';
import NextJSLink, { LinkProps as NextJSLinkProps } from 'next/link';
import { isRunningInStorybook } from '@utils';

interface LinkProps extends NextJSLinkProps {
  className?: string;
}

/**
 * Custom Link component, which wraps NextJS's link. Can be used in Storybook.
 * Provides the correct styling for a link.
 */
const Link: FunctionComponent<LinkProps> = ({
  className,
  children,
  href,
  ...props
}) => {
  const joinedClassNames = cn(styles.link, className);

  if (isRunningInStorybook()) {
    return (
      <a href={href.toString()} {...props}>
        <div className={joinedClassNames}>{children}</div>
      </a>
    );
  }

  return (
    <NextJSLink href={href} {...props}>
      <div className={joinedClassNames}>{children}</div>
    </NextJSLink>
  );
};

export default Link;
