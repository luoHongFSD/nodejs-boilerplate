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

export default function routes() {
  const authRouter = new Router();
  authRouter.post('/auth', async (ctx) => {
    ctx.ok({ message: 'auth' });
  });

  const userRouter = new Router();

  userRouter.get('/user', async (ctx, next) => {
    ctx.body = 'userModels';
  });

  const v1Router = new Router({ prefix: '/v1' });
  const v2Router = new Router({ prefix: '/v2' });


  const api = new Router({ prefix: '/api' });
  v2Router.group([userRouter]);
  v1Router.group([userRouter]);
  api.group([authRouter, v1Router, v2Router]);
  
  return compose(api.mount());
}
