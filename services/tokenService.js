const jwt = require('jsonwebtoken');

const createJWT = (user) => {
    return jwt.sign({
        user: user
    }, process.env.JWT_SECRET, {expiresIn: '1h'})
}

const checkJWT = (token) => {
    let check;

    try {
        check = jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
        if(err.name === 'TokenExpiredError') {
            check = 'renew';
        } else {
            check = false;
        }
    }

    return check;
}

module.exports = {createJWT: createJWT, checkJWT: checkJWT}
