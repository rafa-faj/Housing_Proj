import React, { FunctionComponent } from 'react';
import styles from './ErrorBox.module.scss';

// Surrounds a component with red border to indicate border.
// Please set Parent's position to relative when using this component.
const ErrorBox: FunctionComponent = () => <div className={styles.error} />;

export default ErrorBox;
