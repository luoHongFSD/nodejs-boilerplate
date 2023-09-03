
import Router from 'koa-router'
import {getAuth,postAuth} from "../controller"
import { revoke } from "koa-jwt-blacklist"
const router = new Router();
router.get('/user/reg',  postAuth())

router.get('/user/get',getAuth())

router.post('/user/logout',async(ctx)=>{
    await revoke(ctx.state.user)
    ctx.ok({
      code:0,
      message:'退出成功'
    })
})

export default router