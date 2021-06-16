const model = require('../models/index')
const Users = model['Users'];

const hasRestaurateurRole = async function (req, res, next) {
    let idUser =  req.app.get('userId');

    if (idUser === "tokenExpired") {
        return res.status(500).json({
            success: false,
            message: 'Token expired'
        })
    } else {
        await Users.findOne({where: {id: idUser}})
            .then(User => {
                if (User) {
                    if (parseInt(User.roleId) === parseInt(process.env.RESTAURATEUR)) {
                        next();
                    } else {
                        return res.status(500).json({
                            success: false,
                            message: 'Vous, n\'avez pas la permission'
                        })
                    }
                } else {
                    return res.status(500).json({
                        success: false,
                        message: 'User invalid'
                    })
                }
            })
    }
}

module.exports = { hasRestaurateurRole };
