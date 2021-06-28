const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const apiRouter = require('./routes/api');
const userRouter = require('./routes/user/user');
const userConnectRouter = require('./routes/user/connect');
const userRegisterRouter = require('./routes/user/register');
const restaurantRouter = require('./routes/restaurateur');
const utilisateurRouter = require('./routes/utilisateur');
const deliveryManRouter = require('./routes/deliveryman');
const componentRouter = require('./routes/component');
const logsRouter = require('./routes/logs');
const notificationsRouter = require('./routes/notifications');
require('./config/mongoDBServer');
require('dotenv').config()

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/user-connect', userConnectRouter);
app.use('/user-register', userRegisterRouter);
app.use('/api', apiRouter);
app.use('/api/user', userRouter);
app.use('/api', restaurantRouter);
app.use('/api', utilisateurRouter);
app.use('/api/logs', logsRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/deliveryman', deliveryManRouter);
app.use('/api/component', componentRouter);

module.exports = app;
