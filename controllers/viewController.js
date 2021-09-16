const { json } = require("express");
const User = require("../models/userModel");

/* index controllers */
exports.getIndex = (req, res, next) => {
  if (req.session.isAuth) {
    return res.redirect("/dashboard");
  }
  res.render("index", { login: req.flash("message") });
};

/* register controllers */

exports.getRegister = (req, res, next) => {
  res.render("register", { message: req.flash("message") });
};

exports.postRegister = async (req, res, next) => {
  const session = req.session;

  const user = await User.findOne({ email: req.body.email }).catch(
    (err) => null
  );

  if (user) {
    req.flash("message", "Email is already registered");
    return res.redirect("/register");
  }

  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password,
    userType: req.body.userType,
  }).catch((err) => null);

  if (newUser) {
    return res.redirect("/login");
  }

  req.flash("message", "Could not register the user, try after some time");
  res.redirect("/register");
};

/* login controllers */
exports.getLogin = (req, res, next) => {
  res.render("login", { message: req.flash("message") });
};

exports.postLogin = async (req, res, next) => {
  const session = req.session;
  const user = await User.findOne({ email: req.body.email })
    .select("+password")
    .catch((err) => null);

  if (user) {
    if (user.password == req.body.password) {
      req.session.isAuth = true;
      return res.redirect("/dashboard");
    }
    req.flash("message", "Incorrect Email or Password");
    return res.redirect("/login");
  }

  req.flash("message", "Email is not registered");
  res.redirect("/login");
};

/* ******************** Private Screens ********************* */

/* Profile controllers */
exports.getProfile = (req, res, next) => {
  const arrMenu = [
    "profile",
    "personal-details",
    "educational-details",
    "professional-details",
    "work-details",
  ];
  const show = arrMenu.indexOf(req.query.update);
  console.log(show);
  let showAll = false;
  if (req.query.view) {
    showAll = true;
  }
  res.render("userProfile", {
    show,
    showAll,
  });
};

/* Dashboard controllers */
exports.getDashboard = (req, res, next) => {
  res.render("dashboard");
};

/* Post Job controllers */

exports.getJobCategory = (req, res, next) => {
  res.render("jobCategory");
};

exports.getJobPost = (req, res, next) => {
  res.render("jobPost");
};

/* Update Profile Individual */

exports.getIndividualPersonalDetails = (req, res, next) => {
  res.render("updateProfile/individual/personalDetails");
};

exports.getIndividualProfessionalDetails = (req, res, next) => {
  res.render("updateProfile/individual/professionalDetails");
};

exports.getIndividualValuationDetails = (req, res, next) => {
  res.render("updateProfile/individual/valuationDetails");
};

exports.getIndividualWorkDetails = (req, res, next) => {
  res.render("updateProfile/individual/workDetails");
};

/* Update Profile Entity */

exports.getEntityDetails = (req, res, next) => {
  res.render("updateProfile/entity/entityDetails");
};

exports.getEntityPersonalDetails = (req, res, next) => {
  res.render("updateProfile/entity/personalDetails");
};

exports.getEntityProfessionalDetails = (req, res, next) => {
  res.render("updateProfile/entity/professionalDetails");
};

exports.getEntityValuationDetails = (req, res, next) => {
  res.render("updateProfile/entity/valuationDetails");
};

exports.getEntityWorkDetails = (req, res, next) => {
  res.render("updateProfile/entity/workDetails");
};
