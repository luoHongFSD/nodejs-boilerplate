import Koa from 'koa';
import 'reflect-metadata';
import dataSource from '../lib/database';
import server from './server';

export default async (app: Koa) => {
  await dataSource.initialize();
  return await server(app);
};