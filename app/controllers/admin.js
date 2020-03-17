const User = require("../models/user");
const bcrypt = require("bcrypt");
const dateFns = require("date-fns");

exports.index = (req, res) => {
  res.render("admin/index", {
    title: "Waffle admin"
  });
};

exports.users = (req, res) => {
  res.render("admin/users/index");
};

exports.createUser = (req, res) => {
  res.render("admin/users/create/index");
};

exports.allUsers = (req, res) => {
  User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    res.render("admin/users/allUsers/index", { userMap });
  });
};

exports.singleUser = (req, res) => {
  User.find({}, (err, user) => {
    let singleUser = user.find(function(user) {
      return user._id == req.params.id;
    });
    let formattedDate = dateFns.format(singleUser.date, "dd-MM-yyyy HH:mm:ss");
    res.render("admin/users/singleUser/index", {
      singleUser: singleUser,
      date: formattedDate
    });
  });
};

// POST
exports.createUserPost = (req, res) => {
  const { email, password, password2 } = req.body;
  let errors = [];

  // Check email field
  if (!email) {
    errors.push({ msg: "Please enter E-Mail" });
  }

  // Check password fields
  if (!password || !password2) {
    errors.push({ msg: "Please enter and confirm a password" });
  }

  // Check passwords match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  // Check pass length
  if (password.length < 5) {
    errors.push({ msg: "Password should be at least 6 cahracters" });
  }

  if (errors.length > 0) {
    res.render("admin/users/create/index", {
      errors,
      email,
      password,
      password2
    });
  } else {
    // Validation passed
    User.findOne({ email: email }).then(user => {
      if (user) {
        // User exists
        errors.push({ msg: "Email is already registered" });
        res.render("admin/users/create/index", {
          errors,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          email,
          password
        });

        // Hash Password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Set PW to hash
            newUser.password = hash;
            // Save user
            newUser
              .save()
              .then(() => {
                req.flash("success_msg", "User successfully registered");
                res.redirect("/admin/users");
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
};
