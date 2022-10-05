const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");
const userModel = require('./user.model')


const tokenModel = sequelize.define(
    "token",
    {
      refreshToken: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        require: true,
        unique: true,
        references: {
          model: userModel,
          key: "id",
        },
      },
    },
    {
      timestamps: false,
    }
  );

  module.exports = tokenModel