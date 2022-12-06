const Sequelize = require("sequelize");

const sequelize = require("../util/db");

const Categories = sequelize.define("categories", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  icon: {
    type: Sequelize.BLOB,
    allowNull: true,
  },
});

module.exports = Categories;
