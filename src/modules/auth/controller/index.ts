
import { celebrate, Joi } from 'koa-celebrate'
import compose from 'koa-compose';
import jsonwebtoken from 'jsonwebtoken'
import config from "../../../config";
import { useService } from "../../user/service"

export function getAuth(){
  
  const validator = celebrate({
    query: Joi.object({
      username: Joi.string().required(),
    })
  })

 async function controller(ctx){
  
    const service = useService(ctx.db)
    const users = await service.findOne({where:{name:ctx.query.username}})
    const user = {userId:users.id}
    
    const token = jsonwebtoken.sign({
      data: user,
      sub:user.userId,
      // 设置 token 过期时间
      exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
    }, config.jwtSecret)
    
    ctx.ok({
      code:0,
      data:{
        token:token
      },
      message:'登录成功'
    })

  }
    return compose([
      controller
    ])
}


