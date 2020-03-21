/**
 * Module dependencies.
 */

const express = require("express");
const session = require("express-session");
const compression = require("compression");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
// const csrf = require("csurf");
const helmet = require("helmet");
const dateFns = require("date-fns");

const mongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const winston = require("winston");
const helpers = require("view-helpers");
const config = require("./");
const pkg = require("../package.json");
// const passport = require("passport");

const env = process.env.NODE_ENV || "development";

/**
 * Expose
 */

module.exports = function(app, passport) {
  app.use(helmet());

  // Compression middleware (should be placed before express.static)
  app.use(
    compression({
      threshold: 512
    })
  );

  // Static files middleware
  app.use(express.static(config.root + "/public"));

  // Use winston on production
  let log;
  if (env !== "development") {
    log = {
      stream: {
        write: msg => winston.info(msg)
      }
    };
  } else {
    log = "dev";
  }

  // Don't log during tests
  // Logging middleware
  if (env !== "test") app.use(morgan(log));

  // set views path and default layout
  app.set("views", config.root + "/app/views");
  app.set("view engine", "pug");

  // expose package.json to views
  app.use(function(req, res, next) {
    res.locals.pkg = pkg;
    res.locals.env = env;
    next();
  });

  // bodyParser should be above methodOverride
  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());
  app.use(
    methodOverride(function(req) {
      if (req.body && typeof req.body === "object" && "_method" in req.body) {
        // look in urlencoded POST bodies and delete it
        const method = req.body._method;
        delete req.body._method;
        return method;
      }
    })
  );

  // cookieParser should be above session
  app.use(cookieParser());
  app.use(
    session({
      secret: pkg.name,
      proxy: true,
      resave: true,
      saveUninitialized: true,
      store: new mongoStore({
        url: config.db,
        collection: "sessions"
      })
    })
  );

  // use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  // require("./passport/local")(passport);

  // connect flash for flash messages - should be declared after sessions
  app.use(flash());

  // Global VARS
  app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error_login = req.flash("error");
    res.locals.todayDate = dateFns.format(new Date(), "yyyy-MM-dd");
    next();
  });

  // should be declared after session and flash
  app.use(helpers(pkg.name));

  // adds CSRF support
  // if (process.env.NODE_ENV !== "test") {
  //   app.use(csrf());

  //   // This could be moved to view-helpers :-)
  //   app.use(function(req, res, next) {
  //     res.locals.csrf_token = req.csrfToken();
  //     next();
  //   });
  // }
};
