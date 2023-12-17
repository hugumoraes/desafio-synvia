import { Router } from 'express';

import { tasks_routes } from './tasks';
import { users_routes } from './users';

const routes = Router();

routes.use(tasks_routes);
routes.use(users_routes);

export { routes };
