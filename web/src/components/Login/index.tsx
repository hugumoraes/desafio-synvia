import React from 'react';
import { Buffer } from 'buffer';
import { Navigate } from 'react-router-dom';

import { api } from '_services';
import { useAuth } from '_context/auth';
import BackgroundLogo from '../../assets/background.svg?react';
import styles from './styles.module.scss';

export const Login: React.FC = () => {
  const { token, setToken } = useAuth();

  const handle_login = async (): Promise<void> => {
    const login_information: string = Buffer.from(
      `${'hugomoraes'}:${'123456'}`,
      'utf8',
    ).toString('base64');

    const { data } = await api.get('/authentication', {
      headers: {
        authorization: 'Basic ' + login_information,
      },
    });

    const { token: token_data } = data;

    localStorage.setItem('@synvia:token', token_data);

    setToken(token_data);
  };

  return (
    <div className={styles.container}>
      {token !== '' && <Navigate to="/" />}

      <div className={styles.left}>
        <BackgroundLogo className={styles.background} />
      </div>

      <div className={styles.right}>
        <button type="button" onClick={handle_login}>
          Login
        </button>
      </div>
    </div>
  );
};
