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

interface TaskInterface {
  task_id: number;
  task_title: string;
  task_description: string;
  task_status: string;
  created_at: string;
  updated_at: string;
  tags?: Tag[];
}

interface GetAllTasksResponse {
  tasks: TaskInterface[];
}

interface CreateTaskResponse {
  task: TaskInterface;
}

export const Tasks: React.FC = () => {
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

  useEffect(() => {
    void (async () => {
      try {
        const { data } = await api.get<GetAllTasksResponse>('task');

        const { tasks } = data;

        setTasks(tasks);
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

    setTask({ ...task, [name]: value });
  };

  return (
    <div className={styles.container}>
      <Header />

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
                key={task.task_id}
                task_description={task.task_description}
                task_id={task.task_id}
                task_title={task.task_title}
                task_status={task.task_status}
                created_at={task.created_at}
                tags={task.tags}
                updated_at={task.updated_at}
              />
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};
