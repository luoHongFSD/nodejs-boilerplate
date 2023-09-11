import AuthService  from "../service/auth"
import { v4 as uuid} from "uuid"
export default async function controller(ctx){
    const service = new AuthService(ctx.db)

    ctx.body = await service.SignUp({
      id: uuid(),
      name: ctx.request.body.name,
      password: ctx.request.body.password,
      email: ctx.request.body.email,
      role: ctx.request.body.role,
    })
}