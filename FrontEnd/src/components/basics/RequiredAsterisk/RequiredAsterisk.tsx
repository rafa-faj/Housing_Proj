import React, { FunctionComponent } from 'react';
import styles from './RequiredAsterisk.module.scss';

const RequiredAsterisk: FunctionComponent = () => (
  <span className={styles.asterisk}>*</span>
);

export default RequiredAsterisk;
