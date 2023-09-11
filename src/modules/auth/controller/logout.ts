import { revoke } from "koa-jwt-blacklist"
export default async function controller(ctx){
    await revoke(ctx.state.user)
    ctx.body = { code:0,message:'ok'}
}