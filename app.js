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

require('./oauth')(app);

app.use(BenchmarkMiddleware.benchmark);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(AuthMiddleware.loadUser);
app.use('/api/products', require('./routes/products.routes') );
app.use('/api/users', require('./routes/users.routes'));
app.use('/api', require('./routes/comments.routes'));
app.use('/api', require('./routes/addresses.routes'));
app.use('/api/orders', require('./routes/orders.routes'));
app.use('/api', require('./routes/tags_categories.routes'));
app.use('/api', require('./routes/pages.routes'));

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
