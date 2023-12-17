import { Router } from 'express';

import { tasks_routes } from './tasks';

const routes = Router();

routes.use(tasks_routes);

export { routes };
