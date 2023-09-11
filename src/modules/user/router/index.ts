
import Router from 'koa-router'
import {getAuth,postAuth} from "../controller"

const router = new Router();
router.get('/user',  postAuth())


export default router