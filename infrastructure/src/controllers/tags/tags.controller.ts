/* ---------- External ---------- */
import { Request, Response } from 'express';

/* ---------- Repositories ---------- */
import { tags_repository } from '../../repositories/tags/tags.repository';

/* ---------- Utils ---------- */
import { logger } from '../../common/utils/logs';

const get_tag_by_id = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { id } = request.params;

  logger.debug('ID [get_tag_by_id]:', id);

  const tag = await tags_repository.get_tag_by_id(Number(id));

  logger.debug('TAG [get_tag_by_id]:', tag);

  return response.status(200).json({
    tag,
  });
};

const get_all_tags = async (
  _: Request,
  response: Response,
): Promise<Response> => {
  const tags = await tags_repository.get_all_tags();

  logger.debug('TAGS [get_all_tags]:', tags);

  return response.status(200).json({
    tags,
  });
};

const create_tag = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { tag_name, tag_color } = request.body;

  logger.debug('TAG_NAME [create_tag]:', tag_name);

  const tag = await tags_repository.create_tag({
    tag_name,
    tag_color,
  });

  logger.debug('TAG [create_tag]:', tag);

  return response.status(201).json({
    tag,
  });
};

const delete_tag = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { id } = request.params;

  logger.debug('ID [delete_tag]:', id);

  const tag = await tags_repository.get_tag_by_id(Number(id));

  logger.debug('TAG [delete_tag]:', tag);

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

  logger.debug('ID [update_tag]:', id);
  logger.debug('TAG_NAME [update_tag]:', tag_name);
  logger.debug('TAG_COLOR [update_tag]:', tag_color);

  const tag = await tags_repository.get_tag_by_id(Number(id));

  logger.debug('TAG [update_tag]:', tag);

  const updated_tag = await tags_repository.update_tag(tag, {
    tag_name,
    tag_color,
  });

  logger.debug('UPDATED_TAG [update_tag]:', updated_tag);

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
