// 'use strict';
// const { Model } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class product extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   product.init({
//     name: DataTypes.STRING,
//     image: DataTypes.STRING,
//     url: DataTypes.STRING,
//     description: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'product',
//   });
//   return product;
// };

"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/Database.js");

class Product extends Model {
  static associate(models) {
    // define association here
  }
}

Product.init(
  {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    description: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "products",
  }
);

module.exports = Product;
