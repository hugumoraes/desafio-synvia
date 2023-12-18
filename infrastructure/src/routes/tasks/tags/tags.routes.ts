import { Router, Request, Response, NextFunction } from 'express';

import { tasks_controller } from '../../../controllers/tasks/tasks.controller';

import { logger } from '../../../common/utils/logs';

const tasks_tags_routes = Router();

tasks_tags_routes.post(
  '/task/:id/tag',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint POST /task/:id/tag');

      logger.debug(`Params: ${JSON.stringify(request.params)}`);
      logger.debug(`Query: ${JSON.stringify(request.query)}`);
      logger.debug(`Body: ${JSON.stringify(request.body)}`);

      await tasks_controller.add_tag_to_task(request, response);
    } catch (error) {
      next(error);
    }
  },
);

tasks_tags_routes.delete(
  '/task/:task_id/tag/:tag_id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint DELETE /task/:task_id/tag/:tag_id');

      logger.debug(`Params: ${JSON.stringify(request.params)}`);
      logger.debug(`Query: ${JSON.stringify(request.query)}`);
      logger.debug(`Body: ${JSON.stringify(request.body)}`);

      await tasks_controller.remove_tag_from_task(request, response);
    } catch (error) {
      next(error);
    }
  },
);

export { tasks_tags_routes };
