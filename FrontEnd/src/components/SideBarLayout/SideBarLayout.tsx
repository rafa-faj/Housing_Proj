import React, { FunctionComponent } from 'react';
import NavBar from '../NavBar';
import styles from './SideBarLayout.module.scss';

export const SideBar: FunctionComponent = ({ children }) => (
  <div className={styles.sidebar}>{children}</div>
);

const SideBarLayout: FunctionComponent = ({ children }) => (
  <>
    <NavBar />
    <div className={styles.layout}>{children}</div>
  </>
);

export default SideBarLayout;
