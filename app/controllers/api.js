const Day = require("../models/day");
const IssueType = require("../models/issueType");

exports.getAllModules = function(req, res) {
  Day.find({}, function(err, days) {
    res.json({ days });
  });
};

exports.getAllIssueTypes = function(req, res) {
  IssueType.find({}, function(err, issuetypes) {
    res.json({ issuetypes });
  });
};
