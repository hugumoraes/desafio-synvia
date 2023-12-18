import { PostgresDataSource } from '../../common/databases/postgres.database';

import { User } from '../../models/user/user.entity';

const user_repository = PostgresDataSource.getRepository(User);

const get_user_by_id = async (id: number): Promise<User> => {
  const user = await user_repository.findOne({
    where: {
      user_id: id,
    },
  });

  if (!user) throw new Error('User not found');

  return user;
};

const users_repository = {
  get_user_by_id,
};

export { users_repository };
