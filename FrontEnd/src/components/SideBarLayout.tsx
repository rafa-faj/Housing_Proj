import React from 'react';
import NavBar from './NavBar';

const SideBarLayout: React.FC = ({ children }) => (
  <>
    <NavBar />
    <div className="sidebar-layout">{children}</div>
  </>
);

export default SideBarLayout;

export const SideBar: React.FC = ({ children }) => (
  <div className="sidebar-layout-sidebar">{children}</div>
);
