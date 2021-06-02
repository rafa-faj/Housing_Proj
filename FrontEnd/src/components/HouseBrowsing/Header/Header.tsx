import React, { FunctionComponent } from 'react';
import { filterIcons } from '@icons';
import styles from './Header.module.scss';
import cn from 'classnames';

const Filter: FunctionComponent = () => (
  <>
    <div className={cn('px-lg-5 px-md-4', styles.filter)}>
      <filterIcons.hello className="d-none d-md-flex" />
      <filterIcons.arrow className="d-none d-md-flex" />
      <h2 className={styles.homehubOrange}>Homehub</h2>
      <filterIcons.arrow className="d-none d-md-flex" />
      <filterIcons.loveHouse className="d-none d-md-flex" />
    </div>
  </>
);

export default Filter;
