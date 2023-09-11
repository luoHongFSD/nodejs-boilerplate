import Router from 'koa-router';

const router = new Router();

import reg from "../controller/reg"
import login from "../controller/login"

router.post('/login',login)
router.post('/reg',reg)



export default router