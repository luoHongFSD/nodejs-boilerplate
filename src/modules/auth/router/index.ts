import Router from 'koa-router';

const router = new Router();
import { getAuth } from "../controller";

router
.get('/auth',getAuth())
.post('/login',  async (ctx, next) => {
  ctx.body = {
    "status" : "auth page"
}   
})



export default router