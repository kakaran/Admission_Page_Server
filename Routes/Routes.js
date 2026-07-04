const express = require("express");
const router = express()
const { RoleCheck, requireSignIn, requireSignInAdminCheck } = require("../Middlewares/authentication")
const { CreateAccount, LoginUser, FormCheck, RecordFormChoice } = require("../Controllers/UserController");
const { FormAdd, FormDisplay, StrudentFormDisplay, UserDataConvertInExcel, GetStudentApplications } = require("../Controllers/FormController");
const formidable = require("express-formidable");


//User Routes
router.post("/login", LoginUser)
router.post("/signup", CreateAccount);
router.get("/FormCheck", RoleCheck, FormCheck)
router.post("/formChoice", requireSignIn, RecordFormChoice)

//Form Routes
router.post("/formCreated", requireSignIn, formidable(), FormAdd);
router.get("/FormDispaly", requireSignInAdminCheck, FormDisplay)
router.get("/StudentApplications", requireSignInAdminCheck, GetStudentApplications)
router.get("/StudentformDisplay", RoleCheck, StrudentFormDisplay)
router.get("/xlsxFormFile", UserDataConvertInExcel)


router.get("/authentication", RoleCheck, async (req, res) => {
  const Role = req.Role;
  console.log(Role);
  return res.send(Role);
});

module.exports = router