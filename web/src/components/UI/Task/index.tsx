import React from 'react';
import {
  FaChevronUp,
  FaPencilAlt,
  FaPlus,
  FaRegTrashAlt,
  FaTimes,
} from 'react-icons/fa';

import styles from './styles.module.scss';

interface Tag {
  tag_id: number;
  tag_name: string;
  tag_color: string;
  created_at: string;
  updated_at: string;
}

interface Person {
  person_id: number;
  person_name: string;
  person_email: string;
  person_phone: string;
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
  person?: Person;
}

type Props = TaskInterface & {
  handle_delete_button_click: (task_id: number) => Promise<void>;
  handle_add_tag_button_click: (task_id: number) => void;
  handle_remove_tag_button_click: (
    task_id: number,
    tag_id: number,
  ) => Promise<void>;
  handle_edit_task_button_click: (task_id: number) => void;
};

export const Task: React.FC<Props> = ({
  task_id,
  task_description,
  task_title,
  tags,
  created_at,
  person,
  handle_delete_button_click,
  handle_add_tag_button_click,
  handle_remove_tag_button_click,
  handle_edit_task_button_click,
}) => {
  return (
    <li className={styles.container}>
      <h1>{task_title}</h1>

      <p>{task_description}</p>

      <hr />

      <div className={styles.informational}>
        <span className={styles.owner}>{person?.person_name}</span>

        <span className={styles.date}>
          {new Date(created_at).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>

      <hr />

      <div className={styles.tag_container}>
        <div className={styles.tag_header}>
          <h1>Tags: {tags != null ? tags.length : 0}</h1>

          <button type="button">
            <FaChevronUp />
          </button>
        </div>

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
                <span>{tag.tag_name}</span>

                <button
                  type="button"
                  onClick={async () => {
                    await handle_remove_tag_button_click(task_id, tag.tag_id);
                  }}
                >
                  <FaRegTrashAlt color={`${tag.tag_color}99`} />
                </button>
              </div>
            ))
          : null}

        <button
          type="button"
          className={styles.add_tag_button}
          onClick={() => {
            handle_add_tag_button_click(task_id);
          }}
        >
          <FaPlus />
        </button>
      </div>

      <hr />

      <div className={styles.actions_container}>
        <button
          type="button"
          onClick={async () => {
            await handle_delete_button_click(task_id);
          }}
        >
          <FaTimes />
        </button>

        <button
          type="button"
          onClick={() => {
            handle_edit_task_button_click(task_id);
          }}
        >
          <FaPencilAlt />
        </button>
      </div>
    </li>
  );
};
