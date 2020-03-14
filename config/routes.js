// "use strict";

const { ensureAuthenticated } = require("../config/auth");
// const { customMiddleware } = require("./customMiddleware");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.json({ extended: false });
// const dateFns = require("date-fns");

const home = require("../app/controllers/home");
const api = require("../app/controllers/api");
const projects = require("../app/controllers/projects");
const modules = require("../app/controllers/modules");
const login = require("../app/controllers/login");
const dical = require("../app/controllers/dical");
const profile = require("../app/controllers/profile");
/**
 * Routes
 */

module.exports = function(app) {
  // ROOT
  app.get("/", home.index);

  // LOGIN / LOGOUT
  app.get("/login", login.index);
  app.post("/login", login.login);
  app.get("/logout", login.logout);

  // USERS
  app.get("/api", ensureAuthenticated, api.index);
  app.get("/api/users", ensureAuthenticated, api.users);
  app.get("/api/users/create", ensureAuthenticated, api.createUser);
  app.get("/api/users/allUsers", ensureAuthenticated, api.allUsers);
  app.get("/api/users/:id", ensureAuthenticated, api.singleUser);
  app.post("/api/users/create", ensureAuthenticated, api.createUserPost);
  // User Profile
  app.get("/userProfile", ensureAuthenticated, profile.index);

  // PROJECTS
  app.get("/api/projects", ensureAuthenticated, projects.index);
  app.post("/api/projects", ensureAuthenticated, projects.createProject);
  app.get("/api/project/:key/details", ensureAuthenticated, projects.details);
  app.get("/api/project/:key/edit", ensureAuthenticated, projects.edit);
  app.post("/api/project/:key/edit", ensureAuthenticated, projects.update);
  app.get("/api/project/:key/delete", ensureAuthenticated, projects.delete);
  app.post(
    "/api/project/:key/delete",
    ensureAuthenticated,
    projects.deletePost
  );

  // MODULES
  app.get("/api/modules", ensureAuthenticated, modules.index);
  app.post("/api/modules", ensureAuthenticated, modules.createModule);
  app.get("/api/module/:name/details", ensureAuthenticated, modules.details);
  app.get("/api/module/:name/edit", ensureAuthenticated, modules.edit);
  app.post("/api/module/:name/edit", ensureAuthenticated, modules.update);
  app.get("/api/module/:name/delete", ensureAuthenticated, modules.delete);
  app.post("/api/module/:name/delete", ensureAuthenticated, modules.deletePost);

  // DiCal
  app.get("/dical.:day", ensureAuthenticated, dical.index);
  app.post(
    "/dical.:day",
    ensureAuthenticated,
    urlencodedParser,
    dical.createDay
  );
  app.post(
    "/dical/createModule",
    ensureAuthenticated,
    urlencodedParser,
    dical.createModule
  );

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
