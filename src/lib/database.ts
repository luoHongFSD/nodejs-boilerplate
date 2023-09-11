import { DataSource, DataSourceOptions } from 'typeorm';

import config from '../config';
import { env } from "./env"


function createDateSource(): DataSource {
  const _prefix = env.NODE_ENV === 'development'?'src':'dist'; 
  const _ext =  env.NODE_ENV === 'development'?'ts':'js';

  
  const dataSourceOptions: DataSourceOptions = {
    type: config.database.type,
    username:config.database.username,
    host: config.database.host,
    port: config.database.port,
    password:config.database.password,
    database: config.database.database,
    synchronize: config.database.synchronize,
    logging: true,
   
    entities: [`${_prefix}/modules/**/*.entity.${_ext}`],
    subscribers: [`${_prefix}/modules/**/*.subscriber.${_ext}`],
    migrations: [`${_prefix}/modules/**/*.migration.${_ext}`],
  };

  // create a connection using modified connection options
  const database = new DataSource(dataSourceOptions);

  return database;
}

const dataSource = createDateSource();

export default dataSource;
