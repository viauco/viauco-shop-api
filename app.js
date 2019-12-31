require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const addressesRouter = require('./routes/addresses');
const commentsRouter = require('./routes/comments');
const tagAndCategoriesRouter = require('./routes/tags_categories');
const pagesRouter = require('./routes/pages');

const ordersRouter = require('./routes/orders');

const AuthMiddleware = require('./middlewares/auth');
const BenchmarkMiddleware = require('./middlewares/benchmark');
const AppResponseDto = require('./dtos/responses/app_response.dto');

const app = express();

app.use(BenchmarkMiddleware.benchmark);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(AuthMiddleware.loadUser);
app.use('/api', productsRouter);
app.use('/api', usersRouter);
app.use('/api', commentsRouter);
app.use('/api', addressesRouter);
app.use('/api', ordersRouter);
app.use('/api', tagAndCategoriesRouter);
app.use('/api', pagesRouter);

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
