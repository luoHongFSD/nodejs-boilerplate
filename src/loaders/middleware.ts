
export function errorHandler(){
  const logger = global.$logger;
  const env = global.$env;
  return async function errorHandler(ctx, next) {
    try {
      await next()
    } catch (err) {
      /* istanbul ignore next */
      ctx.status = err.statusCode || 500
      /* istanbul ignore next */
      ctx.body = err.toJSON ? err.toJSON() : { message: err.message, ...err }
      /* istanbul ignore next */
      if (!env.EMIT_STACK_TRACE) {
        delete ctx.body.stack
      }
      logger.error('Error in request', err)
    }
  }
}



/**
 * Let the user know nothing was found here.
 */

export function notFoundHandler(){
  return async function notFoundHandler(ctx) {
    const msg = `${ctx.request.method} ${ctx.request.path}`
    ctx.notFound({
      message: `No endpoint matched your request: ${msg}`
    })
  }
}

 