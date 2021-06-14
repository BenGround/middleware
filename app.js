const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const apiRouter = require('./routes/api');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', apiRouter);

module.exports = app;
