require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

const AuthMiddleware = require('./middlewares/auth.middleware');
const BenchmarkMiddleware = require('./middlewares/benchmark.middleware');
const AppResponseDto = require('./dtos/responses/app_response.dto');

const app = express();

app.use(BenchmarkMiddleware.benchmark);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

require('./services/bus')(app);
require('./services/oauth')(app);
require('./services/socket')(app);

app.use(AuthMiddleware.loadUser);

const fs = require('fs');
fs.readdir('./routes', (err, files) => {
  if( !err ) {
    files.forEach( (file) => {
      app.use('/api', require('./routes/' + file) );
    });
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.json(AppResponseDto.buildWithErrorMessages(err));
});

module.exports = app;
