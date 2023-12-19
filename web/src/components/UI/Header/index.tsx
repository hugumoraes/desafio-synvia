import React from 'react';

import styles from './styles.module.scss';

import Logo from '../../../assets/logo.svg?react';
import { useAuth } from '_context/auth';

export const Header: React.FC = () => {
  const { setToken } = useAuth();

  const handle_logout = (): void => {
    localStorage.removeItem('@synvia:token');
    setToken('');
  };

  return (
    <div>
      <div className={styles.container}>
        <Logo className={styles.logo} />

        <button type="button" onClick={handle_logout}>
          Logout
        </button>
      </div>
    </div>
  );
};
