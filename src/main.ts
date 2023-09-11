import Koa from 'koa';
import loaders from './loaders';
import loadGlobal from "./global";

async function main() {
  try{
    loadGlobal();
    const app = new Koa();
    const server = await loaders(app);
    server.listen(global.$env.PORT, () => {
      const mode = global.$env.NODE_ENV
      global.$logger.debug(`Server listening on ${global.$env.PORT} in ${mode} mode`)
    })
  }
  catch(err){
    global.$logger.error('Error while starting up server', err)
    process.exit(1)
  }

}

main();