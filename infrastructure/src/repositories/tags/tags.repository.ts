import { DeepPartial } from 'typeorm';
import { PostgresDataSource } from '../../common/databases/postgres.database';

import { Tag } from '../../models/tag/tag.entity';

const tag_repository = PostgresDataSource.getRepository(Tag);

const get_tag_by_id = async (id: number): Promise<Tag> => {
  const tag = await tag_repository.findOne({
    where: {
      tag_id: id,
    },
    relations: [],
  });

  if (!tag) throw new Error('Tag not found');

  return tag;
};

const get_all_tags = async (): Promise<Tag[]> => {
  const tags = await tag_repository.find();

  return tags;
};

const create_tag = async (tag: DeepPartial<Tag>): Promise<Tag> => {
  const new_tag = await tag_repository.save(tag);

  return new_tag;
};

const delete_tag = async (tag: Tag): Promise<void> => {
  await tag_repository.remove(tag);
};

const update_tag = async (
  current_tag: Tag,
  tag: DeepPartial<Tag>,
): Promise<Tag> => {
  const updated_tag = await tag_repository.save({
    ...current_tag,
    ...tag,
  });

  return updated_tag;
};

const tags_repository = {
  create_tag,
  delete_tag,
  get_all_tags,
  get_tag_by_id,
  update_tag,
};

export { tags_repository };
