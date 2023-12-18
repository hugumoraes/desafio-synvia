import { Router } from 'express';

import { tasks_routes } from './tasks/tasks.routes';
import { users_routes } from './users/users.routes';
import { tags_routes } from './tags/tags.routes';

const routes = Router();

routes.use(tasks_routes);
routes.use(users_routes);
routes.use(tags_routes);

export { routes };
