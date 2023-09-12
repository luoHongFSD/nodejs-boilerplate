import Router from 'koa-router'
import compose from 'koa-compose';


Router.prototype.group = function (routes: Array<any>) {
  routes.forEach((route) => {
    this.use(route.routes());
  });
  return this
};

Router.prototype.mount = function(){
    return [this.routes(),this.allowedMethods()]
}

export default function routes(options: any) {
  const authRouter = new Router();
  authRouter.post('/auth', async (ctx) => {
    ctx.ok({ message: 'auth' });
  });

  const userRouter = new Router();

  userRouter.get('/user', async (ctx, next) => {
    ctx.body = 'userModels';
  });

  const v1Router = new Router({ prefix: '/v1' });

  //v1Router.use(checkauth());
  v1Router.group([userRouter]);

  const v2Router = new Router({ prefix: '/v2' });
  v2Router.group([userRouter]);

  const api = new Router({ prefix: '/api' });
  api.group([authRouter, v1Router, v2Router]);

  return compose(api.mount());
}
