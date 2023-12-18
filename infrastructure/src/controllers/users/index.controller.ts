import { Request, Response } from 'express';
import { hash, genSalt, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

import { decode } from 'base-64';
import { secret_key } from '../../common/config';
import { users_repository } from '../../repositories/users/users.repository';

import { logger } from '../../common/utils/logs';

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

const register_user = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { user_login, user_password } = request.body;

  try {
    const user = await users_repository.get_user_by_user_login(user_login);

    if (user)
      return response.status(400).json({
        code: '400',
        message: 'User already exists',
      });

    const salt = await genSalt(10);
    const hashed_password = await hash(user_password, salt);

    const created_user = await users_repository.create_user({
      user_login,
      user_password: hashed_password,
    });

    return response.status(201).json({
      user_login: created_user.user_login,
      user_id: created_user.user_id,
    });
  } catch (error) {
    logger.error(error);
    logger.error('Error at POST /users');

    return response.status(500).json({
      code: '500',
      message: 'Internal server error',
    });
  }
};

const authenticate_user = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  try {
    const { headers } = request;
    const { authorization } = headers;

    // TODO:
    // Replace this with a error handling middleware
    if (!authorization || !authorization.includes('Basic'))
      return response.status(401).json({
        code: '401',
        message: 'Unauthorized',
      });

    const credentials = decode(authorization.replace('Basic ', ''));

    const [username, ...password_pieces] = credentials.split(':');

    const password = password_pieces.join('');

    if (!username || !password)
      return response.status(401).json({
        code: '401',
        message: 'Unauthorized',
      });

    const user = await users_repository.get_user_by_user_login(username);

    if (!user)
      return response.status(401).json({
        code: '401',
        message: 'Unauthorized',
      });

    const is_valid_password = await compare(password, user.user_password);

    if (!is_valid_password)
      return response.status(401).json({
        code: '401',
        message: 'Unauthorized',
      });

    const token = jwt.sign(
      {
        user_id: user.user_id,
      },
      secret_key,
      {
        expiresIn: '1d',
      },
    );

    return response.status(200).json({
      token,
    });
  } catch (error) {
    logger.error(error);
    logger.error('Error at GET /users');

    return response.status(500).json({
      code: '500',
      message: 'Internal server error',
    });
  }
};

const users_controller = {
  authenticate_user,
  get_user_by_id,
  register_user,
};

export { users_controller };
