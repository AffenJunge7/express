const User = require("../models/user");
const dateFns = require("date-fns");

exports.index = function(req, res) {
  User.find({}, (err, user) => {
    let singleUser = user.find(function(user) {
      return user._id == req.user.id;
    });

    let formattedDate = dateFns.format(singleUser.date, "dd-MM-yyyy HH:mm:ss");
    res.render("admin/users/profile/index", {
      singleUser: singleUser,
      date: formattedDate
    });
  });
};
