
import AuthService  from "../service/auth"
export default async function controller(ctx){
    const service = new AuthService(ctx.db)
    ctx.body = await service.SignIn(ctx.request.body.email,ctx.request.body.password)
  }