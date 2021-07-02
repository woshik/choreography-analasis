const express = require('express');
const fs = require('fs');
const { resolve } = require('path');
const helmet = require('helmet');
const cors = require('cors');

const logger = require('./utils/serverErrorLogger');
const { connectWithMongodb } = require('./database/connection');

const server = express();

// server exception handling
process.on('uncaughtException', (error) => {
  logger.error({
    label: 'uncaughtException',
    message: error.stack,
  });

  process.exit(1);
});

// server rejection handling
process.on('unhandledRejection', (error) => {
  logger.error({
    label: 'unhandledRejection',
    message: error.stack,
  });

  process.exit(1);
});

if (process.env.NODE_ENV === 'production' && fs.existsSync(__dirname, '../client/build')) {
  server.use('/js', express.static(resolve(__dirname, '../client/dist/js')));
  server.use('/css', express.static(resolve(__dirname, '../client/dist/css')));
  server.use('/media', express.static(resolve(__dirname, '../client/dist/media')));
}

// important middleware
server
  // enable cors for server, Access-Control-Allow-Origin: *
  .use(cors())
  // secure the server with headers
  .use(
    helmet({
      contentSecurityPolicy: false,
    }),
  )
  .use(express.json())
  .use(
    express.urlencoded({
      extended: true,
    }),
  );

// api route mapping
server.use(
  '/api/v1',
  require('./routes/urlConfig')(require('./routes/api'), __dirname),
);

if (process.env.NODE_ENV === 'production') {
  server.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, '../client/dist/index.html'));
  });
}

// catch 404 and forward to error handler
server.use((req, res) => {
  res.status(404).send("Sorry can't find that api!");
});

connectWithMongodb(() => {
  console.log('database connected');
});

module.exports = server;
