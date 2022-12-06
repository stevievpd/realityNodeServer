const { Sequelize } = require("sequelize");
require("dotenv").config();

//Config
const dbhost = process.env.DB_HOST;
const dbusername = process.env.DB_USER;
const dbpass = process.env.DB_PASS;
const dbname = process.env.DB_DATABASE;

const sequelize = new Sequelize(dbname, dbusername, dbpass, {
  dialect: "mysql",
  host: dbhost,
});

module.exports = sequelize;
