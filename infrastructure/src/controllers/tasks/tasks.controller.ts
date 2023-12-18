import { Request, Response } from 'express';

import { tags_repository } from '../../repositories/tags/tags.repository';
import { tasks_repository } from '../../repositories/tasks/tasks.repository';

const get_task_by_id = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { id } = request.params;

  const task = await tasks_repository.get_task_by_id(Number(id));

  return response.status(200).json({
    task,
  });
};

const get_all_tasks = async (
  _: Request,
  response: Response,
): Promise<Response> => {
  const tasks = await tasks_repository.get_all_tasks();

  return response.status(200).json({
    tasks,
  });
};

const create_task = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { task_description, task_title, person_id, task_status_id, tags } =
    request.body;

  const task = await tasks_repository.create_task({
    task_description,
    task_title,
    person: {
      person_id,
    },
    status: { task_status_id },
    tags,
  });

  return response.status(201).json({
    task,
  });
};

const delete_task = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { id } = request.params;

  const task = await tasks_repository.get_task_by_id(Number(id));

  await tasks_repository.delete_task(task);

  return response.status(200).json({
    task,
  });
};

const update_task = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { id } = request.params;
  const { task_description, task_title, person_id, task_status_id } =
    request.body;

  const task = await tasks_repository.update_task(Number(id), {
    task_description,
    task_title,
    person: {
      person_id,
    },
    status: { task_status_id },
  });

  return response.status(200).json({
    task,
  });
};

const add_tag_to_task = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { task_id } = request.params;
  const { tag_id } = request.body;

  const task = await tasks_repository.get_task_by_id(Number(task_id));
  const tag = await tags_repository.get_tag_by_id(Number(tag_id));

  if (!task || !tag) {
    throw new Error('Task or tag not found');
  }

  const updated_task = await tasks_repository.add_tag_to_task(task, tag);

  return response.status(200).json({
    task: updated_task,
  });
};

const remove_tag_from_task = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { task_id, tag_id } = request.params;

  const task_tag = await tasks_repository.get_task_tag_by_id(
    Number(task_id),
    Number(tag_id),
  );

  if (!task_tag) {
    throw new Error('Task or tag not found');
  }

  await tasks_repository.remove_tag_from_task(task_tag);

  return response.status(200).json({
    message: 'Tag removed from task',
  });
};

const tasks_controller = {
  add_tag_to_task,
  delete_task,
  create_task,
  get_task_by_id,
  get_all_tasks,
  remove_tag_from_task,
  update_task,
};

export { tasks_controller };
