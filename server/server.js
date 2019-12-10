const http  = require('http');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const expressIP = require('express-ip');
const compression = require('compression');

const port = process.env.PORT || 8000;
const routes = require('./routes/routes');

const addRequestId = require('express-request-id')();
const morgan = require('morgan');
const morganFormat = '[:date[iso]] :id ":method :url" :status :response-time ms - :res[content-length] ';
const logger = require('./logger');
const path = require('path');


if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, './build/')));
}

app.use(addRequestId);

morgan.token('id', function getId(req) {return req.id});

// Status codes greater than 400 (errors)
app.use(morgan(morganFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: process.stderr
}));

// Status codes less than 400
app.use(morgan(morganFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: process.stdout
}));

// Log requests
app.use((req, res, next) => {
  const log = logger.loggerInstance.child({
    id: req.id,
    body: req.body,
  }, true);
  log.info({req: req});
  next();
});

// Log responses
app.use((req, res, next) => {
  function afterResponse() {
      res.removeListener('finish', afterResponse);
      res.removeListener('close', afterResponse);
      const log = logger.loggerInstance.child({
          id: req.id
      }, true)
      log.info({res:res}, 'response')
  }
  res.on('finish', afterResponse);
  res.on('close', afterResponse);
  next();
});


app.use(bodyParser.json());
app.use(compression());
app.use(expressIP().getIpInfoMiddleware);



const server = app.listen(port, () => console.log('node server running on port ' + port));
routes(app);

if (process.env.NODE_ENV !== 'development') {
  app.use("*", (req, resp) => {
    resp.sendFile(path.join(__dirname, './build/index.html'));
  });
}
