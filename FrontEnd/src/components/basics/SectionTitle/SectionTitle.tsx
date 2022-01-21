import React, { FunctionComponent } from 'react';
import styles from './SectionTitle.module.scss';

const SectionTitle: FunctionComponent = ({ children }) => (
  <div className={styles.section}>{children}</div>
);

export default SectionTitle;
