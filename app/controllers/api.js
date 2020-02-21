const User = require("../models/user");
const bcrypt = require("bcrypt");

// GET
exports.index = (req, res) => {
  res.render("api/index", {
    title: "Waffle Api"
  });
};

exports.users = (req, res) => {
  res.render("api/users/index");
};

exports.createUser = (req, res) => {
  res.render("api/users/create/index");
};

exports.showUsers = (req, res) => {
  res.render("api/users/show/index");
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
    res.render("api/users/create/index", {
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
        res.render("api/users/create/index", {
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
            // Set PW to has
            newUser.password = hash;
            // Save user
            newUser
              .save()
              .then(() => {
                req.flash("success_msg", "User successfully registered");
                res.redirect("/api/users");
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
};
