import React from 'react';

import styles from './styles.module.scss';

import { BsListTask, BsTags } from 'react-icons/bs';

export const Navbar: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.container_navbar}>
      <div className={styles.hightlight_navbar}>
        <BsListTask />
        <p>Tasks</p>
      </div>

      <div>
        <BsTags className={styles.icon} />
        <p>Tags</p>
      </div>
    </div>

    <div className={styles.line} />
  </div>
);
