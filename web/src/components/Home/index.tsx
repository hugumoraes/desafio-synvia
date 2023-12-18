import React from 'react';

import { Header } from '_components/UI/Header';
import { Navbar } from '_components/UI/Navbar';
import { ToggleSelect } from '_components/UI/ToggleSelect';

import styles from './styles.module.scss';

export const Home: React.FC = () => (
  <div className={styles.container}>
    <Header />

    <main className={styles.main}>
      <Navbar />

      <div>
        <ToggleSelect />
      </div>
    </main>
  </div>
);
