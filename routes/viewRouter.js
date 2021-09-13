var express = require("express");
var router = express.Router();
const viewContoller = require("../controllers/viewController");
const authContoller = require("../controllers/authController");

/* GET home page. */
router.get("/", viewContoller.getIndex);

/* Register page. */
router
  .route("/register")
  .get(viewContoller.getRegister)
  .post(viewContoller.postRegister);

/* Login page. */
router.get("/login", viewContoller.getLogin);
//.post(viewContoller.postRegister);

/* Logout session. */
router.get("/logout", authContoller.closeSession);

/* ********** Private Pages. *********** */

/* Dashboard page. */
router.get("/dashboard", viewContoller.getDashboard);

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

module.exports = router;
