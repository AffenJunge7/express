const dateFns = require("date-fns");

const Day = require("../models/day");
const Issue = require("../models/issue");
const issueType = require("../models/issueType");

const calendarConfig = require("./calendarConfig");

exports.index = function(req, res) {
  Day.find(
    {
      date: {
        $gte: calendarConfig.start(req, res),
        $lte: calendarConfig.end(req, res)
      }
    },
    async function(err, days) {
      const daysMap = [];
      const issueMap = [];

      days.forEach(async function(day) {
        let dateFormated = dateFns.format(new Date(day.date), "dd-MM-yyyy");
        daysMap.push(dateFormated);

        const issues = await Issue.find({ date: day.date });
        issueMap.push(issues);
      });

      const issueTypes = await issueType.find();

      res.render("dical/index", {
        title: "Dical Thing Title",
        weekdays: calendarConfig.weekdays(req, res),
        dayNames: calendarConfig.dayNames(req, res),
        nextWeek: calendarConfig.nextWeek(req, res),
        prevWeek: calendarConfig.prevWeek(req, res),
        checkToday: calendarConfig.checkToday(req, res),
        existingDays: daysMap,
        issueTypes,
        existingIssues: issueMap
      });
    }
  );
};

exports.createDay = function(req, res) {
  function reformatDateString(s) {
    var b = s.split(/\D/);
    return b.reverse().join("-");
  }

  const day = new Date(reformatDateString(req.body.date));

  const newDay = new Day({
    date: day
  });

  newDay
    .save()
    .then(() => {
      req.flash("success_msg", "Day created");
      res.sendStatus(201);
    })
    .catch(err => console.log(err));
};

exports.createIssue = function(req, res) {
  function reformatDateString(s) {
    var b = s.split(/\D/);
    return b.reverse().join("-");
  }

  const date = new Date(reformatDateString(req.body.date));
  const issueType = req.body.issueType;
  const summary = req.body.summary;

  const newIssue = new Issue({
    date,
    issueType,
    fields: { summary }
  });

  newIssue
    .save()
    .then(() =>
      Day.findOne({ date }).then(day => {
        day.issues.push({
          issueType: req.body.issueType,
          fields: {
            summary: req.body.summary
          }
        });
        day
          .save()
          .then(() => {
            req.flash("success_msg", "Module created");
            res.sendStatus(201);
          })
          .catch(err => console.log(err));
      })
    )
    .catch(err => console.log(err));
};
