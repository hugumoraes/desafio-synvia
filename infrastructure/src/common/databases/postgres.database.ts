import 'reflect-metadata';

/* ---------- External ---------- */
import { DataSource } from 'typeorm';

/* ---------- Config ---------- */
import { db_host, db_name, db_password, db_port, db_user } from '../config';

/* ---------- Models ---------- */
import { Person } from '../../models/person/person.entity';
import { Status } from '../../models/status/status.entity';
import { Tag } from '../../models/tag/tag.entity';
import { Task } from '../../models/task/task.entity';
import { TaskTag } from '../../models/task-tag/task_tag.entity';
import { User } from '../../models/user/user.entity';

/* ---------- Utils ---------- */
import { logger } from '../utils/logs';

/* ---------- Logs ---------- */
logger.debug(`db_host: ${db_host}`);
logger.debug(`db_port: ${db_port}`);
logger.debug(`db_user: ${db_user}`);
logger.debug(`db_password: ${db_password}`);
logger.debug(`db_name: ${db_name}`);

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: db_host,
  port: db_port,
  username: db_user,
  password: db_password,
  database: db_name,
  entities: [Person, User, Task, Status, Tag, TaskTag],
  synchronize: false,
  logging: false,
});

PostgresDataSource.initialize()
  .then(() => {
    return logger.info('Data Source has been initialized!');
  })
  .catch(err => {
    logger.error(`Error during Data Source initialization: `);
    logger.error(err);
  });
