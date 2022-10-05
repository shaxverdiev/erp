require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { sequelize, openConnection } = require("./db/db");

const router = require("./routes/index.routes");

const PORT = process.env.PORT;

const app = express();

app.use(require("morgan")("dev"));
app.use(require("cors")());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use("/api", router);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log("server success start on port:", PORT);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
