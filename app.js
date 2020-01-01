require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(require('./middlewares/benchmark').benchmark);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./middlewares/auth').loadUser);

const arrRoutes = ['products', 'users', 'addresses', 'comments', 'tags_categories', 'pages', 'orders'];
arrRoutes.forEach( function(route) {
  app.use('/api', require('./routes/' + route) );
} );

app.use('/api/*', (req, res) => { return res.json('Hello');});
app.use('*', (req, res) => { return res.json('Hello');});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.json( require('./dtos/responses/app_response').buildWithErrorMessages(err));
});

module.exports = app;
