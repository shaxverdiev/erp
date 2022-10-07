const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const userModel = require("../models/user.model");

const fileModel = sequelize.define(
  "file",
  {
    name: {
      type: DataTypes.STRING,
      require: true,
    },
    file_extension: {
      type: DataTypes.STRING,
      require: true,
    },
    mime_type: {
      type: DataTypes.STRING,
      require: true,
    },
    size: { type: DataTypes.INTEGER, defaultValue: 0, require: true },
    path: { type: DataTypes.STRING, defaultValue: "", require: true },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: userModel,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = fileModel;
