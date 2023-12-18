import React from 'react';

import styles from './styles.module.scss';

import { IoIosArrowForward } from 'react-icons/io';

export const ToggleSelect: React.FC = () => (
  <div className={styles.container}>
    <div>
      <IoIosArrowForward />
      <p>Select</p>
    </div>
  </div>
);
