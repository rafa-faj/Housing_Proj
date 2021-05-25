import React, { FunctionComponent } from 'react';
import styles from './Link.module.scss';
import cn from 'classnames';
import NextJSLink, { LinkProps as NextJSLinkProps } from 'next/link';
import { isRunningInStorybook } from '@utils';

interface LinkProps extends NextJSLinkProps {
  className?: string;
  noNextJSLink?: boolean; // Require the use of a non NextJS Link, https://nextjs.org/docs/api-reference/next/link
  undecorated?: boolean; // make the link text undecorated (make it black and with no underline)
}

/**
 * Custom Link component, which wraps NextJS's link. Can be used in Storybook.
 * Provides the correct styling for a link.
 */
const Link: FunctionComponent<LinkProps> = ({
  className,
  children,
  href,
  noNextJSLink,
  undecorated,
  ...props
}) => {
  const joinedClassNames = cn(className, {
    [styles.link]: !undecorated,
    [styles.undecoratedLink]: undecorated,
  });

  if (isRunningInStorybook() || noNextJSLink) {
    return (
      <div className={joinedClassNames}>
        <a href={href.toString()} {...props}>
          {children}
        </a>
      </div>
    );
  }

  return (
    <div className={joinedClassNames}>
      <NextJSLink href={href} {...props}>
        {children}
      </NextJSLink>
    </div>
  );
};

export default Link;
