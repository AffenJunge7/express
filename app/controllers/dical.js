const dateFns = require("date-fns");

const Day = require("../models/day");
const Issue = require("../models/issue");

const calendarConfig = require("./calendarConfig");

exports.index = function(req, res) {
  Day.find(
    {
      date: {
        $gte: calendarConfig.start(req, res),
        $lte: calendarConfig.end(req, res)
      }
    },
    function(err, days) {
      const daysMap = [];

      days.forEach(function(day) {
        let dateFormated = dateFns.format(new Date(day.date), "dd-MM-yyyy");
        daysMap.push(dateFormated);
      });

      res.render("dical/index", {
        title: "Dical Thing Title",
        weekdays: calendarConfig.weekdays(req, res),
        dayNames: calendarConfig.dayNames(req, res),
        nextWeek: calendarConfig.nextWeek(req, res),
        prevWeek: calendarConfig.prevWeek(req, res),
        checkToday: calendarConfig.checkToday(req, res),
        existingDays: daysMap,
        issueTypes: issueTypes
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

exports.createModule = function(req, res) {
  function reformatDateString(s) {
    var b = s.split(/\D/);
    return b.reverse().join("-");
  }

  const day = new Date(reformatDateString(req.body.date));

  const newIssue = new Issue({
    // date: day
  });
  console.log(req.body);

  newIssue
    .save()
    .then(() =>
      Day.findOne({ date: day }).then(day => {
        day.issues.push({ issueType: "Test1", name: "Test2" });
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

  // console.log(req.body);
};
