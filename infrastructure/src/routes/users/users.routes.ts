import { Router, Request, Response, NextFunction } from 'express';

import { users_controller } from '../../controllers/users/index.controller';
import { authentication } from '../../common/middlewares/authentication.middleware';

import { logger } from '../../common/utils/logs';

const users_routes = Router();

users_routes.get(
  '/user/:id',
  authentication,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint /user/:id');

      logger.debug(`Params: ${JSON.stringify(request.params)}`);
      logger.debug(`Query: ${JSON.stringify(request.query)}`);
      logger.debug(`Body: ${JSON.stringify(request.body)}`);

      await users_controller.get_user_by_id(request, response);
    } catch (error) {
      next(error);
    }
  },
);

export { users_routes };
