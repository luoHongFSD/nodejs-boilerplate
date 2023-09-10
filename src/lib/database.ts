import { DataSource, DataSourceOptions } from 'typeorm';

import config from '../config';
import { env } from "./env"


function createDateSource(): DataSource {
  const _prefix = env.NODE_ENV === 'development'?'src':'dist'; 
  const _ext =  env.NODE_ENV === 'development'?'ts':'js';
  const _synchronize = env.NODE_ENV === 'development'?true:false;
  
  const dataSourceOptions: DataSourceOptions = {
    type: config.database.type,
    // host: config.database.host,
    // port: config.database.port,
    database: config.database.database,
    synchronize: _synchronize,
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
