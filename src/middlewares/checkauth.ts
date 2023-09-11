import jwt from "koa-jwt";
import config from "../config";
import { isRevoked } from "koa-jwt-blacklist"
const whiteList = ['/api/reg','/api/login']

export default function checkauth() {
  if(config.authMode === 'jwt'){
   return jwt({ secret: config.jwtSecret,isRevoked:isRevoked,debug:true }).unless({
    path: whiteList
  })
  }else{
    return async function (ctx, next) {
      if (ctx.session.username
      || whiteList.includes(ctx.path)
      || ctx.path.indexOf('.html') >= 0) {
         await next()
     } else {
         ctx.unauthorized({code:401,message:"unauthorized"})
     }
 }
  }
 
  
}