const { createLogger, format, transports } = require('winston');

const loggerTest = createLogger({
    level: 'info',
    exitOnError: false,
    format: format.json(),
    transports: [
        new transports.File({ filename: `./logs/bad_token.log`})
    ],
})

module.exports = loggerTest;
