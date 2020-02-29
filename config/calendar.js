// const dateFns = require("date-fns");

module.exports = {
  customMiddleware: function(req, res, next) {
    // const currentDay = dateFns.format(new Date(), "yyyyMMdd");
    console.log("My versy fitst middleware");
    next();
  }
};
