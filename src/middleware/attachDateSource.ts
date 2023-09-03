
export default  function attachDateSource(dataSource){
      return async function request(ctx,next){
            ctx.db = dataSource
            await next()
      }
}