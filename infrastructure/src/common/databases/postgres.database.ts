import { DataSource } from 'typeorm';

import { db_host, db_name, db_password, db_port, db_user } from '../config';

import { Person } from '../../models/person/person.entity';
import { User } from '../../models/user/user.entity';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: db_host,
  port: db_port,
  username: db_user,
  password: db_password,
  database: db_name,
  entities: [Person, User],
  synchronize: true,
  logging: false,
});
