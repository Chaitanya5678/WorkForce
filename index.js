const express = require("express");
const cookieParser = require("cookie-parser");

const port = 8000;
const app = express();

const expressLayouts = require("express-ejs-layouts");

const db = require("./config/mongoose");

//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportGoogle = require("./config/passport-google-oauth2-strategy");

//using mongo store as persistent storage of session cookies
const mongoStore = require("connect-mongo")(session);

//handling post request data and cookies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//extract styles and scripts from subpages into layout
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//set up path to static files
app.use(express.static("./assets"));

//set up view engine and path to views
app.set("view engine", "ejs");
app.set("views", "./views");

//set up for session cookies using passport and express-session
app.use(
  session({
    name: "WorkForce",
    secret: "A955146152DD8",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },

    //set when mongo store is installed for persistence storage of session cookies
    store: new mongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connection to mongo-db set up ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express route
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error in firing up server ", err);
    return;
  }

  console.log("Server is Up and running on port : ", port);
});
