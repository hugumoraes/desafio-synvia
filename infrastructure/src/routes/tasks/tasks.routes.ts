import { Router, Request, Response, NextFunction } from 'express';

import { authentication } from '../../common/middlewares/authentication.middleware';
import { tasks_controller } from '../../controllers/tasks/tasks.controller';

import { logger } from '../../common/utils/logs';
import { tasks_tags_routes } from './tags/tags.routes';

const tasks_routes = Router();

tasks_routes.get(
  '/task/:id',
  authentication,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint GET /task/:id');

      logger.debug(`Params: ${JSON.stringify(request.params)}`);
      logger.debug(`Query: ${JSON.stringify(request.query)}`);
      logger.debug(`Body: ${JSON.stringify(request.body)}`);

      await tasks_controller.get_task_by_id(request, response);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * TODO:
 * - Create pagination for this endpoint
 *
 *
 */
tasks_routes.get(
  '/task',
  authentication,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint GET /task');

      logger.debug(`Params: ${JSON.stringify(request.params)}`);
      logger.debug(`Query: ${JSON.stringify(request.query)}`);
      logger.debug(`Body: ${JSON.stringify(request.body)}`);

      await tasks_controller.get_all_tasks(request, response);
    } catch (error) {
      next(error);
    }
  },
);

tasks_routes.post(
  '/task',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint POST /task');

      logger.debug(`Params: ${JSON.stringify(request.params)}`);
      logger.debug(`Query: ${JSON.stringify(request.query)}`);
      logger.debug(`Body: ${JSON.stringify(request.body)}`);

      await tasks_controller.create_task(request, response);
    } catch (error) {
      next(error);
    }
  },
);

tasks_routes.delete(
  '/task/:id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint DELETE /task/:id');

      logger.debug(`Params: ${JSON.stringify(request.params)}`);
      logger.debug(`Query: ${JSON.stringify(request.query)}`);
      logger.debug(`Body: ${JSON.stringify(request.body)}`);

      await tasks_controller.delete_task(request, response);
    } catch (error) {
      next(error);
    }
  },
);

tasks_routes.patch(
  '/task/:id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint PATCH /task/:id');

      logger.debug(`Params: ${JSON.stringify(request.params)}`);
      logger.debug(`Query: ${JSON.stringify(request.query)}`);
      logger.debug(`Body: ${JSON.stringify(request.body)}`);

      await tasks_controller.update_task(request, response);
    } catch (error) {
      next(error);
    }
  },
);

tasks_routes.use(tasks_tags_routes);

export { tasks_routes };
