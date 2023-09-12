import { nanoid } from 'nanoid-esm';

import { celebrate, Joi } from 'koa-celebrate'
import compose from 'koa-compose';
import { useService } from "../service"


export default function useController(){
     const serivce = useService(global.$db)

  
    function getAll(){

    }

    function getPage(){

    }
    function getDetail(){

    }
    function postDetail(){

    }
    function putDetail(){

    }
    function delDetail(){

    }

    return {
      getAll,
      getPage,
      getDetail,
      postDetail,
      putDetail,
      delDetail
    }
}


export function getAuth(){
  
  const validator = celebrate({
    query: Joi.object({
      username: Joi.string().required(),
    })
  })

  async function controller(ctx){
     
     const service = useService(global.$db)
     const users = await service.findOne({where:{name:ctx.query.username}})
     ctx.body = users
  }
    return compose([
      controller
    ])
}

export function postAuth(){
 async function controller(ctx){
    const service = useService(ctx.db)
    const id = nanoid()
    await service.save({
     id:id,
     name:ctx.query.username,
     email:ctx.query.email,
     role:'ADMIN'
    })
    ctx.ok({
      code:0,
      message:"插入成功"
    }) 
 }
   return compose([
     controller
   ])
}

