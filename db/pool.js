const { Pool } = require("pg");
require("dotenv").config();

const localDatabaseURL = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const isProduction = !!process.env.DATABASE_URL;

module.exports = new Pool({
    connectionString: process.env.DATABASE_URL || localDatabaseURL,
    ssl: isProduction ? { rejectUnauthorized: false} : false,
});