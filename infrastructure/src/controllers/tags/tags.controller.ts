import { Request, Response } from 'express';

import { tags_repository } from '../../repositories/tags/tags.repository';

const get_tag_by_id = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { id } = request.params;

  const tag = await tags_repository.get_tag_by_id(Number(id));

  return response.status(200).json({
    tag,
  });
};

const get_all_tags = async (
  _: Request,
  response: Response,
): Promise<Response> => {
  const tags = await tags_repository.get_all_tags();

  return response.status(200).json({
    tags,
  });
};

const create_tag = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { tag_name, tag_color } = request.body;

  const tag = await tags_repository.create_tag({
    tag_name,
    tag_color,
  });

  return response.status(201).json({
    tag,
  });
};

const delete_tag = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { id } = request.params;

  const tag = await tags_repository.get_tag_by_id(Number(id));

  await tags_repository.delete_tag(tag);

  return response.status(200).json({
    tag,
  });
};

const update_tag = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { id } = request.params;

  const { tag_name, tag_color } = request.body;

  const tag = await tags_repository.get_tag_by_id(Number(id));

  const updated_tag = await tags_repository.update_tag(tag, {
    tag_name,
    tag_color,
  });

  return response.status(200).json({
    tag: updated_tag,
  });
};

const tags_controller = {
  create_tag,
  delete_tag,
  get_all_tags,
  get_tag_by_id,
  update_tag,
};

export { tags_controller };
