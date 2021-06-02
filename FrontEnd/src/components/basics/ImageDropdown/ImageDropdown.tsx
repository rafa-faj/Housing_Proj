import React, { FunctionComponent } from 'react';
import BootstrapDropdown, * as BootstrapDropdownMetadata from 'react-bootstrap/Dropdown';
import styles from './ImageDropdown.module.scss';
import { Button } from '@basics';
import cn from 'classnames';
import { useRouter } from 'next/router';

const ButtonWrapper: FunctionComponent = ({ children }) => (
  <Button variant="wrapper">{children}</Button>
);

// TODO expand this
interface itemConfig {
  href?: string;
  label: string;
  labelClassName?: string;
  onClick?: () => void;
}

interface itemProps extends BootstrapDropdownMetadata.DropdownProps {
  items: itemConfig[];
  profileIcon: string;
}

const ImageDropdown: FunctionComponent<itemProps> = ({
  items,
  className,
  profileIcon,
}) => {
  const router = useRouter();

  return (
    <BootstrapDropdown className={cn(className, styles.dropdown)}>
      <BootstrapDropdown.Toggle
        as={Button}
        className={styles.profileToggle}
        variant="wrapper"
      >
        <img className={styles.profileImage} src={profileIcon}></img>
      </BootstrapDropdown.Toggle>
      {/* might need to make the menu a basic  component itself */}
      <BootstrapDropdown.Menu className={styles.dropdownMenu} align="right">
        {items.map(({ href, label, labelClassName, onClick }) => (
          <BootstrapDropdown.Item
            href={href}
            className={styles.dropdownItem}
            onClick={onClick}
          >
            <h5
              className={cn(
                labelClassName,
                'text-center',
                router.pathname.toLowerCase().slice(1) === label.toLowerCase()
                  ? styles.isSelected
                  : '',
              )}
            >
              {label}
            </h5>
          </BootstrapDropdown.Item>
        ))}
      </BootstrapDropdown.Menu>
    </BootstrapDropdown>
  );
};

export default ImageDropdown;
