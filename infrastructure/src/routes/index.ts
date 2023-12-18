import { Router } from 'express';

import { tasks_routes } from './tasks/tasks.routes';
import { users_routes } from './users/users.routes';
import { tags_routes } from './tags/tags.routes';
import { authentication_routes } from './authentication/authentication.routes';

const routes = Router();

routes.use(authentication_routes);
routes.use(tasks_routes);
routes.use(users_routes);
routes.use(tags_routes);

export { routes };
