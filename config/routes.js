"use strict";

/**
 * Module dependencies.
 */

const home = require("../app/controllers/home");
const api = require("../app/controllers/api");
const login = require("../app/controllers/login");

/**
 * Routes
 */

module.exports = function(app) {
  app.get("/", home.index);

  app.get("/login", login.index);
  app.post("/login", login.login);

  app.get("/api", api.index);
  app.get("/api/users", api.users);
  app.get("/api/users/create", api.createUser);
  app.get("/api/users/show", api.showUsers);
  app.post("/api/users/create", api.createUserPost);

  /**
   * Error handling
   */

  app.use(function(err, req, res, next) {
    // treat as 404
    if (
      err.message &&
      (~err.message.indexOf("not found") ||
        ~err.message.indexOf("Cast to ObjectId failed"))
    ) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render("500", { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function(req, res) {
    res.status(404).render("404", {
      url: req.originalUrl,
      error: "Not found"
    });
  });
};
