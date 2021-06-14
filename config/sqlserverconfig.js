const config = {
    server: 'BENJAMIN',
    authentication: {
        type: 'default',
        options: {
            userName: 'admin',
            password: 'admin'
        }
    },
    options: {
        encrypt: true,
        trustServerCertificate: true,
        database: 'cesitonplat'
    }
};

module.exports = config;
