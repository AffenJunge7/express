"use strict";

/*
 * nodejs-express-mongoose
 * Copyright(c) 2015 Madhusudhan Srinivasa <madhums8@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies
 */

require("dotenv").config();

const fs = require("fs");
const join = require("path").join;
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("./config");

const models = join(__dirname, "app/models");
const port = process.env.PORT || 3000;

const app = express();
const connection = connect();

/**
 * Expose
 */

module.exports = {
  app,
  connection
};

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.indexOf(".js"))
  .forEach(file => require(join(models, file)));

// Bootstrap routes
// require("./config/passport/local")(passport);
require("./config/express")(app, passport);
require("./config/routes")(app, passport);

connection
  .on("error", console.log)
  .on("disconnected", connect)
  .once("open", listen);

function listen() {
  if (app.get("env") === "test") return;
  app.listen(port);
  console.log(
    `Express app started at localhost on port ${port} and DB connected...`
  );
}

function connect() {
  var options = {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
  mongoose.connect(config.db, options);
  return mongoose.connection;
}
