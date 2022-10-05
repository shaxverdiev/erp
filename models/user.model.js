const { DataTypes } = require("sequelize");
const { sequelize} = require("../db/db");

const userModel = sequelize.define(
    "user",
    {
      login: {
        type: DataTypes.STRING,
        unique: true,
        require: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  module.exports = userModel