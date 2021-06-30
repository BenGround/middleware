const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const apiRouter = require('./routes/api');
require('./config/mongoDBServer');
require('dotenv').config()

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// const allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', '*');
//     res.header('Access-Control-Allow-Headers', '*');
//     next();
// }
//
// app.use(allowCrossDomain)

app.use('/api', apiRouter);

module.exports = app;
