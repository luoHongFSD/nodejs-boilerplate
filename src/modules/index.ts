import glob from 'glob'
import Router from 'koa-router'
import compose from 'koa-compose';


export default function routes() {
  const router = new Router({prefix:'/api'});
  glob(`${__dirname}/*`, { ignore: '**/index.ts' }, (err, matches) => {
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