import * as http from 'http';
import Koa from 'koa';
import cors from '@koa/cors';
import respond from 'koa-respond';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import session from 'koa-generic-session';

import routes from "../modules"
import { errorHandler ,notFoundHandler } from "./middleware"
import middleware from "../middlewares"

export default (app:Koa)=>{
  app.proxy = true;
 
  app.keys = ['keys', 'keykeys'];
  
  app
    // Top middleware is the error handler.
    .use(errorHandler())
    // Compress all responses.
    .use(compress())
    // Adds ctx.ok(), ctx.notFound(), etc..
    .use(respond())
    // Handles CORS.
    .use(cors())
    .use(session())
   
    // Parses request bodies.
    .use(bodyParser());
  
  app.use(middleware()); 
  app.use(routes())
    .use(notFoundHandler());
  
  // Creates a http server ready to listen.
  const server = http.createServer(app.callback());

  // Add a `close` event listener so we can clean up resources.
  server.on('close', () => {
    // You should tear down database connections, TCP connections, etc
    // here to make sure Jest's watch-mode some process management
    // tool does not release resources.
    global.$logger.debug('Server closing, bye!');
  });

  global.$logger.debug('Server created, ready to listen', { scope: 'startup' });
  return server;
}