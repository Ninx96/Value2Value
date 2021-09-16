var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var logger = require("morgan");
var flash = require("connect-flash");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// Mongo DB
const mongoose = require("mongoose");
const MongoDBSession = require("connect-mongodb-session")(session);

/**
 * Connect to DataBase
 */

const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB Connection Successfull");
  })
  .catch((err) => console.error(err));

// session store

const store = new MongoDBSession({
  uri: DB,
  collection: "Sessions",
});

// Routers imports

var viewRouter = require("./routes/viewRouter");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(
  session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    secret: process.env.SECRET,
    store: store,
  })
);
app.use(express.static(path.join(__dirname, "public")));

// Routers

app.use("/", viewRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
