import glob from 'glob'
import Router from 'koa-router'
import compose from 'koa-compose';
import { env } from "../lib/env"

export default function routes() {
  const _ext = env.NODE_ENV === 'development'?'ts':'js';
  const router = new Router({prefix:'/api'});
  glob(`${__dirname}/*`, { ignore: `**/index.${_ext}` }, (err, matches) => {
    if (err) { throw err }
  
    matches.forEach((mod) => {
      const route = require(`${mod}/router`)
      const routes = route.default
      router.use(routes.routes(), routes.allowedMethods())
    })
  })


  return compose(
      [
        router.routes(),
        router.allowedMethods()
      ]
  )
}