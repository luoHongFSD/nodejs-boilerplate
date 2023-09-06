import { DataSource, DataSourceOptions } from 'typeorm';

import config from '../config';

function createDateSource(): DataSource {
  
  const dataSourceOptions: DataSourceOptions = {
    type: config.database.type,
    // host: config.database.host,
    // port: config.database.port,
    database: config.database.database,
    synchronize: true,
    logging: true,
   
    entities: ['src/modules/**/*.entity.ts'],
    subscribers: ['src/modules/**/*.subscriber.ts'],
    migrations: ['src/modules/**/*.migration.ts'],
  };

  // create a connection using modified connection options
  const database = new DataSource(dataSourceOptions);

  return database;
}

const dataSource = createDateSource();

export default dataSource;
