const dateFns = require("date-fns");
const { de } = require("date-fns/locale");

exports.urlDate = function(req) {
  return req.params.day ? new Date(Date.parse(req.params.day)) : new Date();
};

exports.start = function(req, res) {
  return dateFns.startOfWeek(
    this.urlDate(req, res),
    { locale: de },
    { weekStartsOn: 1 }
  );
};

exports.end = function(req, res) {
  return dateFns.endOfWeek(
    this.urlDate(req, res),
    { locale: de },
    { weekStartsOn: 1 }
  );
};

exports.weekdays = function(req, res) {
  return dateFns
    .eachDayOfInterval({
      start: this.start(req, res),
      end: this.end(req, res)
    })
    .map(day => dateFns.format(day, "dd-MM-yyyy"));
};

exports.nextWeek = function(req, res) {
  return dateFns.format(
    dateFns.addDays(this.urlDate(req, res), 7),
    "yyyy-MM-dd"
  );
};

exports.prevWeek = function(req, res) {
  return dateFns.format(
    dateFns.subDays(this.urlDate(req, res), 7),
    "yyyy-MM-dd"
  );
};

exports.dayNames = function() {
  return [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag"
  ];
};

exports.checkToday = function(req, res) {
  return dateFns
    .eachDayOfInterval({
      start: this.start(req, res),
      end: this.end(req, res)
    })
    .map(day => dateFns.isToday(day));
};
