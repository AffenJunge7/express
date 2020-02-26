const Module = require("../models/module");

exports.index = function(req, res) {
  Module.find({}, function(err, projects) {
    res.render("api/modules/index", { projects });
  });
};
