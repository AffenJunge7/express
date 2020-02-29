const dateFns = require("date-fns");
const { de } = require("date-fns/locale");

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
    title: "Dical Thingasdassd",
    weekdays,
    dayNames,
    nextWeek,
    prevWeek,
    today
  });
};

exports.createDay = function(req, res) {
  console.log("Button pushed");
};
