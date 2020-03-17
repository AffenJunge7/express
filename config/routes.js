// "use strict";

const { ensureAuthenticated } = require("../config/auth");
// const { customMiddleware } = require("./customMiddleware");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.json({ extended: false });
// const dateFns = require("date-fns");

const home = require("../app/controllers/home");
const admin = require("../app/controllers/admin");
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

  // LOGIN
  app.get("/login", login.index);
  app.post("/login", login.login);

  // LOGOUT
  app.get("/logout", login.logout);

  // ADMIN
  app.get("/admin", ensureAuthenticated, admin.index);
  app.get("/admin/users", ensureAuthenticated, admin.users);
  app.get("/admin/users/create", ensureAuthenticated, admin.createUser);
  app.get("/admin/users/allUsers", ensureAuthenticated, admin.allUsers);
  app.get("/admin/users/:id", ensureAuthenticated, admin.singleUser);
  app.post("/admin/users/create", ensureAuthenticated, admin.createUserPost);
  // User Profile
  app.get("/userProfile", ensureAuthenticated, profile.index);

  // PROJECTS
  app.get("/admin/projects", ensureAuthenticated, projects.index);
  app.post("/admin/projects", ensureAuthenticated, projects.createProject);
  app.get("/admin/project/:key/details", ensureAuthenticated, projects.details);
  app.get("/admin/project/:key/edit", ensureAuthenticated, projects.edit);
  app.post("/admin/project/:key/edit", ensureAuthenticated, projects.update);
  app.get("/admin/project/:key/delete", ensureAuthenticated, projects.delete);
  app.post(
    "/admin/project/:key/delete",
    ensureAuthenticated,
    projects.deletePost
  );

  // MODULES
  app.get("/admin/modules", ensureAuthenticated, modules.index);
  app.post("/admin/modules", ensureAuthenticated, modules.createModule);
  app.get("/admin/module/:name/details", ensureAuthenticated, modules.details);
  app.get("/admin/module/:name/edit", ensureAuthenticated, modules.edit);
  app.post("/admin/module/:name/edit", ensureAuthenticated, modules.update);
  app.get("/admin/module/:name/delete", ensureAuthenticated, modules.delete);
  app.post(
    "/admin/module/:name/delete",
    ensureAuthenticated,
    modules.deletePost
  );

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
