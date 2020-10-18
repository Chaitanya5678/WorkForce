const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
const env = require("./environment");

passport.use(
  new googleStrategy(env.google_oauth, function (
    accessToken,
    refreshToken,
    profile,
    done
  ) {
    User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
      if (err) {
        console.log("Error in Google Strategy Passport", err);
        return;
      }

      if (user) {
        return done(null, user);
      } else {
        User.create(
          {
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
          },

          function (err, user) {
            if (err) {
              console.log(
                "Error in creating account for Google Strategy Passport",
                err
              );
              return;
            }

            return done(null, user);
          }
        );
      }
    });
  })
);

//serializing the user to decide which key to be put into the cookie

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserializing the user from the key in the cookies

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user");
      return done(err);
    }

    return done(null, user);
  });
});

//check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect("/users/sign-in");
};

//set if a user is authenticated
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }

  next();
};

module.exports = passport;
