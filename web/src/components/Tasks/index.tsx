import React, { useEffect, useState } from 'react';

import { Header } from '_components/UI/Header';
import { Navbar } from '_components/UI/Navbar';
import { Task } from '_components/UI/Task';

import styles from './styles.module.scss';
import { api } from '_services';

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
  created_at: string;
  updated_at: string;
  tags?: Tag[];
  person?: Person;
}

interface GetAllTasksResponse {
  tasks: TaskInterface[];
}

interface GetAllTagsResponse {
  tags: Tag[];
}
interface CreateTaskResponse {
  task: TaskInterface;
}

export const Tasks: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [task, setTask] = useState<TaskInterface>({
    created_at: '',
    task_description: '',
    task_id: 0,
    task_status: '',
    task_title: '',
    tags: [],
    updated_at: '',
  });
  const [modal, setModal] = useState('');
  const [tag_modal, setTagModal] = useState(false);
  const [edit_modal, setEditModal] = useState(true);

  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    void (async () => {
      try {
        const { data: task_data } = await api.get<GetAllTasksResponse>('task');
        const { data: tag_data } = await api.get<GetAllTagsResponse>('/tag');

        const { tasks } = task_data;
        const { tags } = tag_data;

        const sorted_tasks = tasks.sort((a, b) => a.task_id - b.task_id);

        setTags(tags);
        setTasks(sorted_tasks);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handle_delete_task = async (task_id: number): Promise<void> => {
    try {
      await api.delete(`task/${task_id}`);

      setTasks(tasks.filter(task => task.task_id !== task_id));
    } catch (error) {
      console.log(error);
    }
  };

  const handle_add_task = async (): Promise<void> => {
    try {
      const { data } = await api.post<CreateTaskResponse>('task', {
        task_title: task.task_title,
        task_description: task.task_description,
      });

      const { task: new_task } = data;

      setTasks([...tasks, new_task]);
    } catch (error) {
      console.log(error);
    }
  };

  const handle_input_change = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { name, value } = event.target;

    if (name === 'edit_task_title' || name === 'edit_task_description') {
      const tasks_copy = tasks.map(task => ({ ...task }));

      const task_index = tasks_copy.findIndex(
        task => task.task_id === Number(modal),
      );

      if (task_index === -1) return;

      tasks_copy[task_index] = {
        ...tasks_copy[task_index],
        [name.replace('edit_', '')]: value,
      };

      setTasks(tasks_copy);
    }

    setTask({ ...task, [name]: value });
  };

  const handle_add_tag = (task_id: number): void => {
    setModal(String(task_id));
    setTagModal(true);
    setEditModal(false);
  };

  const handle_remove_tag_from_task = async (
    task_id: number,
    tag_id: number,
  ): Promise<void> => {
    try {
      const task_index = tasks.findIndex(task => task.task_id === task_id);

      if (task_index === -1) {
        return;
      }

      const tags_copy: Tag[] = [];
      tasks[task_index].tags?.forEach(tag => {
        tags_copy.push(tag);
      });

      const tag_index = tags_copy.findIndex(tag => tag.tag_id === tag_id);

      if (tag_index === -1) {
        return;
      }

      await api.delete(`task/${String(task_id)}/tag/${String(tag_id)}`);

      tags_copy.splice(tag_index, 1);

      const task_copy = { ...tasks[task_index] };
      task_copy.tags = tags_copy;

      const tasks_copy = tasks.map(task => ({ ...task }));
      tasks_copy[task_index] = task_copy;

      setTasks(tasks_copy);
    } catch (error) {
      console.log(error);
    }
  };

  const handle_add_tag_to_task = async (
    task_id: number,
    tag_id: number,
  ): Promise<void> => {
    try {
      const task_index = tasks.findIndex(task => task.task_id === task_id);

      if (task_index === -1) {
        setModal('');
        setEditModal(false);
        setTagModal(false);
        return;
      }

      const tags_copy: Tag[] = [];
      tasks[task_index].tags?.forEach(tag => {
        tags_copy.push(tag);
      });

      const tag_index = tags_copy.findIndex(tag => tag.tag_id === tag_id);

      if (tag_index !== -1) {
        setModal('');
        setEditModal(false);
        setTagModal(false);
        return;
      }

      await api.post(`task/${String(task_id)}/tag`, {
        tag_id,
      });

      tags_copy.push(tags.find(tag => tag.tag_id === tag_id) as Tag);

      const task_copy = { ...tasks[task_index] };
      task_copy.tags = tags_copy;

      const tasks_copy = tasks.map(task => ({ ...task }));
      tasks_copy[task_index] = task_copy;

      setTasks(tasks_copy);
      setModal('');
      setEditModal(false);
      setTagModal(false);
    } catch (error) {
      setModal('');
      setEditModal(false);
      setTagModal(false);
      console.log(error);
    }
  };

  const handle_edit_task_button_click = (task_id: number): void => {
    const task = tasks.find(task => task.task_id === task_id);

    if (task == null) return;

    setModal(String(task_id));
    setEditModal(true);
    setTagModal(false);
  };

  const handle_edit_task = async (): Promise<void> => {
    try {
      const task_index = tasks.findIndex(
        task => task.task_id === Number(modal),
      );

      if (task_index === -1) {
        setModal('');
        setEditModal(false);
        setTagModal(false);
        return;
      }

      const { task_id, task_title, task_description } = tasks[task_index];

      await api.patch(`task/${String(task_id)}`, {
        task_title,
        task_description,
      });

      setModal('');
      setEditModal(false);
      setTagModal(false);
    } catch (error) {
      setModal('');
      setEditModal(false);
      setTagModal(false);
      console.log(error);
    }
  };

  const use_outside_hook = (ref: React.RefObject<HTMLDivElement>): void => {
    useEffect(() => {
      const handle_click_outside = (event: MouseEvent): void => {
        if (
          ref.current != null &&
          !ref.current.contains(event.target as Node)
        ) {
          setModal('');
          setEditModal(false);
          setTagModal(false);
        }
      };

      document.addEventListener('mousedown', handle_click_outside);
      return () => {
        document.removeEventListener('mousedown', handle_click_outside);
      };
    }, [ref]);
  };

  use_outside_hook(ref);

  return (
    <div className={styles.container}>
      <Header />

      <div className={modal === '' ? styles.modal_hidden : styles.modal}>
        <div className={styles.modal_content} ref={ref}>
          {tag_modal && (
            <ul className={styles.tags_modal}>
              {tags.map(tag => (
                <li
                  key={tag.tag_id}
                  style={{
                    backgroundColor: `${tag.tag_color}33`,
                    color: `${tag.tag_color}99`,
                    border: `0.5px solid ${tag.tag_color}33`,
                  }}
                  onClick={async () => {
                    await handle_add_tag_to_task(Number(modal), tag.tag_id);
                  }}
                >
                  <span>{tag.tag_name}</span>
                </li>
              ))}
            </ul>
          )}

          {edit_modal && (
            <div className={styles.edit_modal}>
              <label htmlFor="task_title">Task title</label>
              <input
                type="text"
                placeholder="Task title"
                onChange={handle_input_change}
                name="edit_task_title"
                value={
                  tasks.find(task => task.task_id === Number(modal))?.task_title
                }
              />

              <label htmlFor="task_description">Task description</label>
              <input
                type="text"
                placeholder="Task description"
                onChange={handle_input_change}
                name="edit_task_description"
                value={
                  tasks.find(task => task.task_id === Number(modal))
                    ?.task_description
                }
              />

              <button type="button" onClick={handle_edit_task}>
                Save
              </button>
            </div>
          )}
        </div>
      </div>

      <main className={styles.main}>
        <Navbar />

        <div className={styles.tasks}>
          <h1>Tasks</h1>

          <div className={styles.input_row}>
            <input
              type="text"
              placeholder="Task title"
              onChange={handle_input_change}
              name="task_title"
              value={task.task_title}
            />

            <input
              type="text"
              placeholder="Task description"
              onChange={handle_input_change}
              name="task_description"
              value={task.task_description}
            />

            <button type="button" onClick={handle_add_task}>
              Add
            </button>
          </div>

          <ul>
            {tasks.map(task => (
              <Task
                handle_delete_button_click={handle_delete_task}
                handle_add_tag_button_click={handle_add_tag}
                handle_remove_tag_button_click={handle_remove_tag_from_task}
                handle_edit_task_button_click={handle_edit_task_button_click}
                key={task.task_id}
                task_description={task.task_description}
                task_id={task.task_id}
                task_title={task.task_title}
                task_status={task.task_status}
                created_at={task.created_at}
                tags={task.tags}
                updated_at={task.updated_at}
                person={task.person}
              />
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};
