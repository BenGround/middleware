const jwt = require('jsonwebtoken');
const _ = require('lodash')

const createJWT = (user) => {
    return jwt.sign({
        user: user
    }, process.env.JWT_SECRET, {expiresIn: '10h'})
}

const checkJWT = (token) => {
    let check;

    try {
        check = jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
        if(_.isEqual(err.name, 'TokenExpiredError')) {
            check = 'tokenExpired';
        } else {
            check = false;
        }
    }

    return check;
}

module.exports = {createJWT: createJWT, checkJWT: checkJWT}
