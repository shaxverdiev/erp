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
    mimetype: {
      type: DataTypes.STRING,
      require: true,
    },
    size: { type: DataTypes.INTEGER, defaultValue: 0 },
    path: { type: DataTypes.STRING, defaultValue: "" },
    user_id: {
      type: DataTypes.INTEGER,
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

module.exports = fileModel;
