const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sequelize = require('./config/sqlServerInstance');
const apiRouter = require('./routes/api');
const connectRouter = require('./routes/connect');
const loggerTest = require("./models/logger");
const {checkJWT} = require("./services/tokenService");
require('dotenv').config()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/connect', connectRouter);
app.use('/api', function (req, res, next) {
    let token = req.headers.authorization

    if (token) {
        token = token.replace(/^Bearer\s+/, "")

        const verify = checkJWT(token)

        if (!verify) {
            loggerTest.info('Bad token')
            return res.status(500).json({
                success: false,
                message: 'Token is not valid'
            })
        } else {
            app.set('userId', verify.user.id)
            next()
        }
    } else {
        return res.status(500).json({
            success: false,
            message: 'Token not provided'
        })
    }
})

app.use('/api', apiRouter);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = app;
