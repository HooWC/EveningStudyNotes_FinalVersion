const sql = require('mssql/msnodesqlv8');
require('dotenv').config();

const dbConfig = {
    database: process.env.DB_DATABASE,
    server: process.env.DB_SERVER,
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL (Windows Auth)');
        return pool;
    })
    .catch(err => console.error('DB Connection Failed:', err));

module.exports = { sql, poolPromise };