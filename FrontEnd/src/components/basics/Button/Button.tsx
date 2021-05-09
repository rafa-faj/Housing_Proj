import React, { FunctionComponent } from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';
import { Icon as IconType, IconProps } from '@icons';

/**
 * The size of the button. Primary = bigger, Secondary = smaller.
 */
export enum ButtonSize {
  Primary = 'primary',
  Secondary = 'secondary',
}

/**
 * The type of the button. The wrapper type should be used for icons/images/etc; it has no
 * padding/margin and has a transparent background. To make something "inactive", use the
 * `disabled` prop.
 */
export enum ButtonVariant {
  Solid = 'solid',
  Outline = 'outline',
  Wrapper = 'wrapper',
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: { icon: IconType; config?: IconProps };
}

/**
 * Button component. size is 'primary' by default and variant is 'solid' by default.
 * Can optionally provide an icon, which will be prepended to the children of the
 * button.
 */
const Button: FunctionComponent<ButtonProps> = ({
  size = ButtonSize.Primary,
  variant = ButtonVariant.Solid,
  children,
  icon,
  ...buttonProps
}) => {
  const Icon = icon?.icon; // React components that are rendered with JSX must be capitalized
  const iconConfig = icon?.config || {};
  const configuredIcon = (
    <div className={styles.icon}>
      <Icon {...iconConfig} />
    </div>
  );

  const content = icon ? (
    <div className="justify-content-center">
      {configuredIcon} {children}
    </div>
  ) : (
    children
  );

  return (
    <button
      className={cn(styles.button, styles[size], styles[variant])}
      {...buttonProps}
    >
      {content}
    </button>
  );
};

export default Button;
