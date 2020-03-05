// const dateFns = require("date-fns");

module.exports = {
  customMiddleware: function(req, res, next) {
    console.log("My first Custom Middleware");
    next();
  }
};
