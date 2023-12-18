import { DeepPartial } from 'typeorm';

import { TaskTag } from '../../models/task-tag/task_tag.entity';
import { Task } from '../../models/task/task.entity';
import { PostgresDataSource } from '../../common/databases/postgres.database';
import { Tag } from '../../models/tag/tag.entity';

const task_repository = PostgresDataSource.getRepository(Task);
const task_tag_repository = PostgresDataSource.getRepository(TaskTag);

const get_task_by_id = async (id: number): Promise<Task> => {
  const task = await task_repository.findOne({
    where: {
      task_id: id,
    },
    relations: ['person', 'tags', 'status'],
  });

  if (!task) throw new Error('Task not found');

  return task;
};

const get_all_tasks = async (): Promise<Task[]> => {
  const tasks = await task_repository.find({
    relations: ['person', 'tags', 'status'],
  });

  return tasks;
};

const create_task = async (task: DeepPartial<Task>): Promise<Task> => {
  const new_task = await task_repository.save(task);

  return new_task;
};

const delete_task = async (task: Task): Promise<Task> => {
  await task_repository.remove(task);

  return task;
};

const update_task = async (
  id: number,
  task: DeepPartial<Task>,
): Promise<Task> => {
  const current_task = await task_repository.findOne({
    where: {
      task_id: id,
    },
    relations: ['person', 'tags', 'status'],
  });

  if (!current_task) throw new Error('Task not found');

  const updated_task = await task_repository.save({
    ...current_task,
    ...task,
  });

  return updated_task;
};

const get_task_tag_by_id = async (
  task_id: number,
  tag_id: number,
): Promise<TaskTag> => {
  const task_tag = await task_tag_repository.findOne({
    where: {
      task: {
        task_id,
      },
      tag: {
        tag_id,
      },
    },
  });

  if (!task_tag) throw new Error('Task tag not found');

  return task_tag;
};

const add_tag_to_task = async (
  task: DeepPartial<Task>,
  tag: DeepPartial<Tag>,
): Promise<Task> => {
  const { task: updated_task } = await task_tag_repository.save({
    tag,
    task,
  });

  return updated_task;
};

const remove_tag_from_task = async (task_tag: TaskTag): Promise<void> => {
  await task_tag_repository.remove([task_tag]);
};

const tasks_repository = {
  add_tag_to_task,
  create_task,
  delete_task,
  get_all_tasks,
  get_task_by_id,
  get_task_tag_by_id,
  remove_tag_from_task,
  update_task,
};

export { tasks_repository };
