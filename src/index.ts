const cluster = require('cluster');
const os = require('os');
/* 判断如果是主线程那么就启动三个子线程 */
if (cluster.isMaster) {
  /* 多少个cpu启动多少个子进程 */
  for (let i = 0; i < os.cpus().length; i++) {
    let timer = null; /* 记录每一个woker */
    const worker = cluster.fork(); /* 记录心跳次数 */
    let missedPing = 0; /* 每五秒发送一个心跳包 并记录次数加1 */
    timer = setInterval(() => {
      missedPing++;
      worker.send('ping'); /* 如果大于5次都没有得到响应说明可能挂掉了就退出 并清楚定时器 */
      if (missedPing > 5) {
        process.kill(worker.process.pid);
        worker.send('ping');
        clearInterval(timer);
      }
    }, 5000); /* 如果接收到心跳响应就让记录值-1回去 */
    worker.on('message', (msg) => {
      msg === 'pong' && missedPing--;
    });
  } /* 如果有线程退出了，我们重启一个 */
  cluster.on('exit', () => {
    cluster.fork();
  });
} else {
  /* 如果是子进程就去加载启动文件 */
  require('./main.js'); /* 心跳回应 */
  process.on('message', (msg) => {
    msg === 'ping' && process.send('pong');
  });
  process.on('uncaughtException', (err) => {
    console.error(err); /* 进程错误上报 */ /* 如果程序内存大于xxxm了让其退出 */
    if (process.memoryUsage().rss > 734003200) {
      console.log('大于700m了，退出程序吧');
      process.exit(1);
    } /* 退出程序 */
    process.exit(1);
  });
}
