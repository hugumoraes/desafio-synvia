import { Router, Request, Response } from 'express';

import { logger } from '../../common/utils/logs';

const tasks_routes = Router();

tasks_routes.get('/task/:id', async (request: Request, response: Response) => {
  const { params } = request;

  logger.info(`Calling route '/task/:id' with id: ${params.id}`);

  return response.json({ message: params.id });
});

export { tasks_routes };
