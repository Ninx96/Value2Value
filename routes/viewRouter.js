var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");

const viewContoller = require("../controllers/viewController");
const authContoller = require("../controllers/authController");
const { get } = require("mongoose");

/* GET home page. */
router.get("/", viewContoller.getIndex);

/* Register page. */
router
  .route("/register")
  .get(viewContoller.getRegister)
  .post(viewContoller.postRegister);

/* Login page. */
router
  .route("/login")
  .get(viewContoller.getLogin)
  .post(viewContoller.postLogin);

/* Logout session. */
router.get("/logout", authContoller.closeSession);

/* ********** Private Pages. *********** */

/* Dashboard page. */
router.get("/dashboard", authContoller.authSession, viewContoller.getDashboard);

/* Job Category page. */
router.get("/job-category", viewContoller.getJobCategory);

/* Job Post page. */
router.get("/job-post", viewContoller.getJobPost);

/* ********** Update Individual profile. *********** */
router.get("/individual/personal", viewContoller.getIndividualPersonalDetails);

router.get(
  "/individual/professional",
  viewContoller.getIndividualProfessionalDetails
);

router.get(
  "/individual/valuation",
  viewContoller.getIndividualValuationDetails
);

router.get("/individual/work", viewContoller.getIndividualWorkDetails);

/* ********** Update Entity profile. *********** */
router.get("/entity/details", viewContoller.getEntityDetails);

router.get("/entity/personal", viewContoller.getEntityPersonalDetails);

router.get("/entity/professional", viewContoller.getEntityProfessionalDetails);

router.get("/entity/valuation", viewContoller.getEntityValuationDetails);

router.get("/entity/work", viewContoller.getEntityWorkDetails);

/* ********** Update Entity profile. *********** */

router.get("/profile", viewContoller.getProfile);

module.exports = router;
