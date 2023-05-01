const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
    process.env.POSTGRESQL_DB_NAME,
    process.env.POSTGRESQL_DB_USER,
    process.env.POSTGRESQL_DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.POSTGRESQL_DB_HOST,
        port: process.env.POSTGRESQL_DB_PORT
    }
)