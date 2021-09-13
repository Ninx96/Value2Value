const User = require("../models/userModel");

/* index controllers */
exports.getIndex = (req, res, next) => {
  res.render("index");
};

/* register controllers */
exports.getRegister = (req, res, next) => {
  res.render("register");
};

exports.postRegister = async (req, res, next) => {
  const session = req.session;
  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password,
    userType: req.body.userType,
  }).catch((err) => null);

  if (newUser) {
    res.status(200).json({
      status: 1,
      message: "Signed Up Successfull! Please Verify your Email",
      user: newUser,
    });
  }

  res.status(200).json({
    status: 0,
    message: "Could not create the user",
    user: newUser,
    session: session,
  });
};

/* login controllers */
exports.getLogin = (req, res, next) => {
  res.render("login");
};

/* ******************** Private Screens ********************* */

/* Dashboard controllers */
exports.getDashboard = (req, res, next) => {
  res.render("dashboard");
};

/* Post Job controllers */
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
