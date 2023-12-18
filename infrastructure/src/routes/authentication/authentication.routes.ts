import { Router, Request, Response, NextFunction } from 'express';

import { logger } from '../../common/utils/logs';

import { users_controller } from '../../controllers/users/index.controller';

const authentication_routes = Router();

authentication_routes.get(
  '/authentication',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint GET /authentication');

      logger.debug(`Params: ${JSON.stringify(request.params)}`);
      logger.debug(`Query: ${JSON.stringify(request.query)}`);
      logger.debug(`Body: ${JSON.stringify(request.body)}`);
      logger.debug(`Headers: ${JSON.stringify(request.headers)}`);

      await users_controller.authenticate_user(request, response);
    } catch (error) {
      next(error);
    }
  },
);

authentication_routes.post(
  '/authentication',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint POST /authentication');

      logger.debug(`Params: ${JSON.stringify(request.params)}`);
      logger.debug(`Query: ${JSON.stringify(request.query)}`);
      logger.debug(`Body: ${JSON.stringify(request.body)}`);
      logger.debug(`Headers: ${JSON.stringify(request.headers)}`);

      await users_controller.register_user(request, response);
    } catch (error) {
      next(error);
    }
  },
);

export { authentication_routes };
