require('dotenv').config();

var DB_HOST = process.env.DB_HOST || 'localhost';
var DB_USER = process.env.DB_USER || 'root';
var DB_PASS = process.env.DB_PASS || '';
var DB_DBNAME = process.env.DB_DBNAME || 'rhcumpires';

var PORT = process.env.PORT || 3001;

var JWT_ENCRYPTION = process.env.JWT_ENCRYPTION || 'readinghockeyclub';
var JWT_EXPIRY = process.env.JWT_EXPIRY || 86400;

module.exports = {
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_DBNAME,
    PORT,
    JWT_ENCRYPTION,
    JWT_EXPIRY
}