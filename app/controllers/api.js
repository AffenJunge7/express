const calenderConfig = require("./calendarConfig");

const Day = require("../models/day");
const IssueType = require("../models/issueType");
const IssueTypeScheme = require("../models/IssueTypeScheme");
const Issue = require("../models/issue");

exports.index = function(req, res) {
  res.render("api/index");
};

// Days
// GET all days
exports.getAllDays = function(req, res) {
  Day.find({}, function(err, days) {
    res.json({ days });
  });
};
// GET single day
exports.getSingleDay = function(req, res) {
  // function reformatDateString(s) {
  //   var b = s.split(/\D/);
  //   return b.reverse().join("-");
  // }
  // const urlDay = new Date(reformatDateString(req.params.day));
  const urlDay = new Date(req.params.day);

  Day.find({ date: urlDay }, function(err, day) {
    res.json({ day });
  });
};

// GET single week
exports.getSingleWeek = function(req, res) {
  const start = calenderConfig.start(req, res);
  const end = calenderConfig.end(req, res);

  Day.find({ date: { $gte: start, $lte: end } }, function(err, week) {
    res.json({ week });
  });
};

// Issues
// GET all issues
exports.getAllIssues = function(req, res) {
  Issue.find({}, function(err, issues) {
    res.json({ issues });
  });
};
// GET single Issue by ID
exports.getSingleIssueID = function(req, res) {
  Issue.findById(req.params.id, function(err, issue) {
    res.json({ issue });
  });
};

// Issue Types
exports.getAllIssueTypes = function(req, res) {
  IssueType.find({}, function(err, issuetypes) {
    res.json({ issuetypes });
  });
};

// Issue Type Schemes (Fields)
exports.getIssueTypesScheme = function(req, res) {
  IssueTypeScheme.find({ name: req.params.name }, function(
    err,
    issuetypesschemes
  ) {
    res.json({ issuetypesschemes });
  });
};
