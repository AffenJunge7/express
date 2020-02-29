const dateFns = require("date-fns");
const { de } = require("date-fns/locale");

const Day = require("../models/day");

exports.index = function(req, res) {
  const urlDate = req.params.day
    ? new Date(Date.parse(req.params.day))
    : new Date();

  const start = dateFns.startOfWeek(
    urlDate,
    { locale: de },
    { weekStartsOn: 1 }
  );

  const end = dateFns.endOfWeek(urlDate, { locale: de }, { weekStartsOn: 1 });

  const weekdays = dateFns
    .eachDayOfInterval({
      start: start,
      end: end
    })
    .map(day => dateFns.format(day, "dd-MM-yyyy"));

  const nextWeek = dateFns.format(dateFns.addDays(urlDate, 7), "yyyy-MM-dd");

  const prevWeek = dateFns.format(dateFns.subDays(urlDate, 7), "yyyy-MM-dd");

  const dayNames = [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag"
  ];

  const today = dateFns
    .eachDayOfInterval({
      start: start,
      end: end
    })
    .map(day => dateFns.isToday(day));

  res.render("dical/index", {
    title: "Dical Thing Title",
    weekdays,
    dayNames,
    nextWeek,
    prevWeek,
    today
  });
};

exports.createDay = function(req, res) {
  function reformatDateString(s) {
    var b = s.split(/\D/);
    return b.reverse().join("-");
  }

  const day = new Date(reformatDateString(req.body.date));

  const data = { date: day };

  const newDay = new Day({
    date: day
  });

  newDay.save(data, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log("click added to db");
    res.sendStatus(201);
  });
};
