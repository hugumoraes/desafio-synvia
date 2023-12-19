import { Router, Request, Response, NextFunction } from 'express';

import { tags_controller } from '../../controllers/tags/tags.controller';
import { authentication } from '../../common/middlewares/authentication.middleware';

import { logger } from '../../common/utils/logs';

const tags_routes = Router();

tags_routes.get(
  '/tag/:id',
  authentication,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint GET /tag/:id');

      logger.debug(`Params: ${JSON.stringify(request.params)}`);
      logger.debug(`Query: ${JSON.stringify(request.query)}`);
      logger.debug(`Body: ${JSON.stringify(request.body)}`);

      await tags_controller.get_tag_by_id(request, response);
    } catch (error) {
      next(error);
    }
  },
);

tags_routes.get(
  '/tag',
  authentication,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint GET /tag');

      logger.debug(`Params: ${JSON.stringify(request.params)}`);
      logger.debug(`Query: ${JSON.stringify(request.query)}`);
      logger.debug(`Body: ${JSON.stringify(request.body)}`);

      await tags_controller.get_all_tags(request, response);
    } catch (error) {
      next(error);
    }
  },
);

tags_routes.post(
  '/tag',
  authentication,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint POST /tag');

      logger.debug(`Params: ${JSON.stringify(request.params)}`);
      logger.debug(`Query: ${JSON.stringify(request.query)}`);
      logger.debug(`Body: ${JSON.stringify(request.body)}`);

      await tags_controller.create_tag(request, response);
    } catch (error) {
      next(error);
    }
  },
);

tags_routes.delete(
  '/tag/:id',
  authentication,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint DELETE /tag/:id');

      logger.debug(`Params: ${JSON.stringify(request.params)}`);
      logger.debug(`Query: ${JSON.stringify(request.query)}`);
      logger.debug(`Body: ${JSON.stringify(request.body)}`);

      await tags_controller.delete_tag(request, response);
    } catch (error) {
      next(error);
    }
  },
);

tags_routes.patch(
  '/tag/:id',
  authentication,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint PATCH /tag/:id');

      logger.debug(`Params: ${JSON.stringify(request.params)}`);
      logger.debug(`Query: ${JSON.stringify(request.query)}`);
      logger.debug(`Body: ${JSON.stringify(request.body)}`);

      await tags_controller.update_tag(request, response);
    } catch (error) {
      next(error);
    }
  },
);

export { tags_routes };
