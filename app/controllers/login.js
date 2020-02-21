const passport = require("passport");
require("../../config/passport/local")(passport);

// GET
exports.index = function(req, res) {
  res.render("login/index", {
    title: "Waffle Login"
  });
};

// POST
exports.login = function(req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })(req, res, next);
};

exports.logout = function(req, res) {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/login");
};
