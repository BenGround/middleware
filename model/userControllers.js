const config = require('../config/sqlserverconfig');
const sql = require('mssql')

exports.getUsers = async (req, res) => {
    const pool = await sql.connect(config);

    return await pool.request().query("SELECT * FROM users")
        .then(Users => res.status(200).json(Users.recordset))
        .catch(error => res.status(400).json({error}));
}

exports.getUser = async (req, res) => {
    const pool = await sql.connect(config);

    return await pool.request()
        .input('idUser', sql.Int, req.params.idUser)
        .query("SELECT * FROM users WHERE id = @idUser")
        .then(User => res.status(200).json(User.recordset))
        .catch(error => res.status(400).json({error}));
}

exports.createUser = async (req, res) => {
    const pool = await sql.connect(config);

    return await pool.request()
        .input('id', sql.Int, req.body.id)
        .input('email', sql.NVarChar, req.body.email)
        .input('password', sql.NVarChar, req.body.password)
        .input('firstname', sql.NVarChar, req.body.firstname)
        .input('lastname', sql.NVarChar, req.body.lastname)
        .execute('InsertUser')
        .then(res.status(200).json({'result' : true}))
        .catch(error => res.status(400).json({'result' : false, 'error': error}));
}

exports.deleteUser = async (req, res) => {
    const pool = await sql.connect(config);

    return await pool.request()
        .input('idUser', sql.Int, req.params.idUser)
        .query("DELETE FROM users WHERE id = @idUser")
        .then(res.status(200).json({'result' : true}))
        .catch(error => res.status(400).json({'result' : false, 'error': error}));
}
