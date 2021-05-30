/* eslint-disable global-require */
const cluster = require('cluster');

// clustering only apply on production server
if (cluster.isMaster) {
  require('dotenv').config();

  console.log(`Application Environment: ${process.env.NODE_ENV}`);

  const cpuNum = process.env.NODE_ENV === 'production' ? require('os').cpus().length : 1;

  for (let i = 0; i < cpuNum; i += 1) {
    cluster.fork();
  }

  // every time when any child process fail start new process
  cluster.on('exit', () => {
    cluster.fork();
  });
} else {
  const http = require('http');
  const server = require('./server');

  // http server start running
  const { PORT = 5000 } = process.env;

  http
    .createServer(server)
    .listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`));
}
