const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(
  "user-signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      User.findOne({ email: email })
        .then(function (user) {
          if (!user) {
            return done(null, false, {
              status: 500,
              message: `user email does't not exist`,
            });
          }
          if (!user.autheticate(password)) {
            return done(null, false, {
              status: 500,
              message: "user password is invalid",
            });
          }
          if (
            user.role === "company" ||
            user.role === "parent" ||
            user.role === "sitter"
          ) {
            return done(null, user);
          } else {
            return done(null, false, {
              status: 500,
              message: "user role is invalid",
            });
          }
        })
        .catch(done);
    }
  )
);
