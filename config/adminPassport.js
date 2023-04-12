const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Admin = require("../models/admin");

passport.use(
  "admin-signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      Admin.findOne({ email: email })
        .then(function (admin) {
          if (!admin) {
            return done(null, false, {
              status: 500,
              message: `admin email does't not exist`,
            });
          }
          if (!admin.autheticate(password)) {
            return done(null, false, {
              status: 500,
              message: "admin password is invalid",
            });
          }
          return done(null, admin);
        })
        .catch(done);
    }
  )
);
