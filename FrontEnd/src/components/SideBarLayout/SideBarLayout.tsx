import React from 'react';
import NavBar from '../NavBar/NavBar';
import styles from './SideBarLayout.module.scss';

const SideBarLayout: React.FC = ({ children }) => (
  <>
    <NavBar />
    <div className={styles.layout}>{children}</div>
  </>
);

export default SideBarLayout;

export const SideBar: React.FC = ({ children }) => (
  <div className={styles.sidebar}>{children}</div>
);
