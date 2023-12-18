import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

import { BsListTask, BsTags } from 'react-icons/bs';

export const Navbar: React.FC = () => {
  const [navigation] = useState([
    { name: 'Tasks', icon: BsListTask, path: '/tasks' },
    { name: 'Tags', icon: BsTags, path: '/tags' },
  ]);

  return (
    <nav className={styles.container}>
      <ul>
        {navigation.map((item, index) => (
          <li key={index}>
            <item.icon />

            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
