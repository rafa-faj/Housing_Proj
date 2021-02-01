import React from 'react';

const SideBarLayout: React.FC = ({ children }) => {
  return <div className="sidebar-layout">{children}</div>;
};

export default SideBarLayout;

export const SideBar: React.FC = ({ children }) => {
  return <div className="sidebar-layout-sidebar">{children}</div>;
};
