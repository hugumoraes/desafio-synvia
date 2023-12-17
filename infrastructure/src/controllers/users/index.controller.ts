import { Request, Response } from 'express';

import { users_repository } from '../../repositories/users/index.repository';

const get_user_by_id = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { id } = request.params;

  const user = await users_repository.get_user_by_id(Number(id));

  return response.status(200).json({
    user,
  });
};

const users_controller = {
  get_user_by_id,
};

export { users_controller };
