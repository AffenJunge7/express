const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// Load User Model
// const User = mongoose.model("User");
const User = require("../../app/models/user");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //  Match User
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            return done(null, false, {
              message: "That Email is not registered"
            });
          }
          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

// module.exports = new LocalStrategy(
//   {
//     usernameField: "email",
//     passwordField: "password"
//   },
//   function(email, password, done) {
//     const options = {
//       criteria: { email: email }
//     };
//     User.load(options, function(err, user) {
//       if (err) return done(err);
//       if (!user) {
//         return done(null, false, { message: "Unknown user" });
//       }
//       if (!user.authenticate(password)) {
//         return done(null, false, { message: "Invalid password" });
//       }
//       return done(null, user);
//     });
//   }
// );
