import compose from 'koa-compose';
import glob from 'glob'

export default function middleware(){
  
  const _ext = global.$env.NODE_ENV === 'development'?'ts':'js';
  const middleware = []
  glob(`${__dirname}/*`,{ ignore: `**/index.${_ext}` }, (err, matches) => {
    if (err) { throw err }
    matches.forEach((mod) => {
      middleware.push(require(mod).default())
    })
  })


  return compose(middleware)
}