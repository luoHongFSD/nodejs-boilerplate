import * as http from 'http';
import Koa from 'koa';
import cors from '@koa/cors';
import respond from 'koa-respond';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import session from 'koa-generic-session';


import { logger } from './logger';

import { notFoundHandler } from '../middleware/not-found';
import { errorHandler } from '../middleware/error-handler';
import { checkauth } from "../middleware/checkauth"
import attachDateSource from "../middleware/attachDateSource"

import dataSource from './database';

import routes from "../modules"
import "reflect-metadata"
/**
 * Creates and returns a new Koa application.
 * Does *NOT* call `listen`!
 *
 * @return {Promise<http.Server>} The configured app.
 */
export async function createServer() {
  logger.debug('dataSoure initialize...');
  await dataSource.initialize();

  logger.debug('Creating server...');
  const app = new Koa();

  app.proxy = true;
 
  app.keys = ['keys', 'keykeys'];
  
  app.use(attachDateSource(dataSource))
    // Top middleware is the error handler.
    .use(errorHandler)
    // Compress all responses.
    .use(compress())
    // Adds ctx.ok(), ctx.notFound(), etc..
    .use(respond())
    // Handles CORS.
    .use(cors())
    .use(session())
   
    // Parses request bodies.
    .use(bodyParser())
    .use(checkauth())
    
    .use(routes())
    .use(notFoundHandler);
  
  // Creates a http server ready to listen.
  const server = http.createServer(app.callback());

  // Add a `close` event listener so we can clean up resources.
  server.on('close', () => {
    // You should tear down database connections, TCP connections, etc
    // here to make sure Jest's watch-mode some process management
    // tool does not release resources.
    logger.debug('Server closing, bye!');
  });

  logger.debug('Server created, ready to listen', { scope: 'startup' });
  return server;
}
