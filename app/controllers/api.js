const Day = require("../models/day");

exports.getAllModules = function(req, res) {
  Day.find({}, function(err, days) {
    res.json({ days });
  });
};
