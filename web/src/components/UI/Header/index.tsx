import React from 'react';

import styles from './styles.module.scss';

import Logo from '../../../assets/logo.svg?react';

export const Header: React.FC = () => (
  <div>
    <div className={styles.container}>
      <Logo className={styles.logo} />
    </div>

    <div className={styles.line} />
  </div>
);
