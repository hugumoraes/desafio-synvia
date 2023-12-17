import React from 'react';

import styles from './styles.module.scss';

import BackgroundLogo from '../../assets/background.svg?react';

export const Login: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.left}>
      <BackgroundLogo className={styles.background} />
    </div>

    <div className={styles.right}>
      <h1>Teste</h1>
    </div>
  </div>
);
