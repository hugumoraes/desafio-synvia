import React from 'react';
import { Buffer } from 'buffer';
import { Navigate, useNavigate } from 'react-router-dom';
import LogoLogin from '../../assets/logo-login.svg?react';

import { api } from '_services';
import { useAuth } from '_context/auth';
import BackgroundLogo from '../../assets/background.svg?react';
import styles from './styles.module.scss';

export const Login: React.FC = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const handle_login = async (): Promise<void> => {
    const login_information: string = Buffer.from(
      `${username}:${password}`,
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

    navigate('/');
  };

  const handle_navigate_to_register = (): void => {
    navigate('/register');
  };

  const handle_input_change = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { name, value } = event.target;

    if (name === 'username') {
      setUsername(value);
    }

    if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <div className={styles.container}>
      {token !== '' && <Navigate to="/" />}

      <div className={styles.left}>
        <BackgroundLogo className={styles.background} />
      </div>

      <div className={styles.right}>
        <div className={styles.login_form}>
          <LogoLogin />

          <h1>Login to your Account</h1>

          <label>Username</label>
          <input
            type="username"
            id="username"
            onChange={handle_input_change}
            value={username}
            name="username"
          />

          <label>Password</label>
          <input
            type="password"
            id="password"
            onChange={handle_input_change}
            value={password}
            name="password"
          />

          <button className={styles.login_button} onClick={handle_login}>
            Login
          </button>
        </div>

        <div className={styles.register}>
          <span>Not Registered Yet?</span>

          <button type="button" onClick={handle_navigate_to_register}>
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
};
