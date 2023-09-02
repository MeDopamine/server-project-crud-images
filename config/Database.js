"use strict";
const { Sequelize } = require("sequelize");
const config = require('./config.json')[process.env.NODE_ENV || 'test'];
const mysql2 = require("mysql2");

// ...
const db = new Sequelize(config.database, config.username, config.password, config);

// const db = new Sequelize("crud-images", "admin", "admin123", {
//     host: "crud-images.cyrmzmhpftan.ap-southeast-1.rds.amazonaws.com",
//     dialect: "mysql",
//     dialectModule: mysql2,
// });
// const db = new Sequelize("crud-images", "root", "", {
//     host: "localhost",
//     dialect: "mysql",
//     dialectModule: mysql2,
// });

module.exports = db;
