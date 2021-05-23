import React, { FunctionComponent } from 'react';
import NavBar from '../NavBar';
import styles from './Layout.module.scss'

const Layout: FunctionComponent = ({ children }) => (
  <>
    <NavBar />
    <div className={styles.layout}> {children}</div>
  </>

)

export default Layout


