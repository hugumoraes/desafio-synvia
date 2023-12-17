import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { db_host, db_name, db_password, db_port, db_user } from '../config';

import { Person } from '../../models/person/person.entity';
import { User } from '../../models/user/user.entity';
import { Task } from '../../models/task/task.entity';
import { Status } from '../../models/status/status.entity';
import { Tag } from '../../models/tag/tag.entity';

import { logger } from '../utils/logs';

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
  entities: [Person, User, Task, Status, Tag],
  synchronize: true,
  logging: false,
});

PostgresDataSource.initialize()
  .then(() => {
    return logger.info('Data Source has been initialized!');
  })
  .catch(err => {
    return logger.error(
      `Error during Data Source initialization: ${JSON.stringify(
        err,
        null,
        2,
      )}`,
    );
  });
