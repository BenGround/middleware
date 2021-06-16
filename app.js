const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const userRouter = require('./routes/user/user');
const userConnectRouter = require('./routes/user/connect');
const userRegisterRouter = require('./routes/user/register');
const testRouter = require('./routes/testRoute');
const loggerTest = require("./models/logger");
const {checkJWT} = require("./services/tokenService");
require('dotenv').config()
const mongoose = require('mongoose');
const cors = require('cors')

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/user-connect', userConnectRouter);
app.use('/user-register', userRegisterRouter);
app.use('/test', testRouter);
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

app.use('/api/user', userRouter);

const uri = 'mongodb+srv://admin:admin@cluster0.kprfz.mongodb.net/Project';
mongoose.connect(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'Project'
    })
    .then(() => console.log('Connexion à MongoDB  Commune réussie !'))
    .catch(() => console.log('Connexion à MongoDB Commune échouée !'));

module.exports = app;
