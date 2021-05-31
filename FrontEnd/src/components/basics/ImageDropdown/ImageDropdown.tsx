import React, { FunctionComponent } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './ImageDropdown.module.scss';
import { navIcons } from '@icons';
import { Button } from '@basics';

const ButtonWrapper: FunctionComponent = ({ children }) => (
  <Button variant="wrapper">{children}</Button>
);

const ImageDropdown: FunctionComponent = ({}) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        as={Button}
        className={styles.profileToggle}
        variant="wrapper"
      >
        <div className={styles.profileImage}>
          <navIcons.profile />
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.dropdownMenu} align="right">
        <Dropdown.Item href="#/action-1" className={styles.dropdownText}>
          Action
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2" className={styles.dropdownText}>
          Another action
        </Dropdown.Item>
        <Dropdown.Item href="#/action-3" className={styles.dropdownText}>
          Something else
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ImageDropdown;
