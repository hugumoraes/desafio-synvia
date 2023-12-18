import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

import styles from './styles.module.scss';

interface Tag {
  tag_id: number;
  tag_name: string;
  tag_color: string;
  created_at: string;
  updated_at: string;
}

interface TaskInterface {
  task_id: number;
  task_title: string;
  task_description: string;
  task_status: string;
  tags?: Tag[];
  created_at: string;
  updated_at: string;
}

type Props = TaskInterface & {
  handle_delete_button_click: (task_id: number) => Promise<void>;
};

export const Task: React.FC<Props> = ({
  task_id,
  task_description,
  task_title,
  tags,
  handle_delete_button_click,
}) => {
  return (
    <div className={styles.container}>
      <h1>{task_title}</h1>

      <p>{task_description}</p>

      <hr />

      <span>Hugo Moraes Bonatto</span>

      <hr />

      <div className={styles.tag_container}>
        {tags != null
          ? tags.map(tag => (
              <div
                key={tag.tag_id}
                className={styles.tag}
                style={{
                  backgroundColor: `${tag.tag_color}33`,
                  color: `${tag.tag_color}99`,
                  border: `0.5px solid ${tag.tag_color}33`,
                }}
              >
                {tag.tag_name}
              </div>
            ))
          : null}
      </div>

      <hr />

      <div className={styles.actions_container}>
        <button
          type="button"
          onClick={async () => {
            await handle_delete_button_click(task_id);
          }}
        >
          <FaRegTrashAlt />
        </button>
      </div>
    </div>
  );
};
