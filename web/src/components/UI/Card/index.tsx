import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

import styles from './styles.module.scss';

export const Card: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.title_container}>
      <h1>Título task</h1>

      <FaRegTrashAlt className={styles.delete_button} />
    </div>

    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        dignissim arcu et ex imperdiet, quis ornare nibh mollis. Sed semper,
        dolor ut fermentum placerat
      </p>
    </div>

    <div className={styles.footer}>
      <div className={styles.tag_container}>
        <span>Tag1</span>
        <span>Tag2</span>
      </div>

      <div>
        <div className={styles.card_info}>
          <span className={styles.date}>1d</span>
          <span className={styles.user}>MN</span>
        </div>
      </div>
    </div>
  </div>
);
