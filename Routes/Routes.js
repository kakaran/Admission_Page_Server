const express = require("express");
const router = express()
const { RoleCheck, requireSignIn, requireSignInAdminCheck } = require("../Middlewares/authentication")
const { CreateAccount, LoginUser, FormCheck } = require("../Controllers/UserController");
const { FormAdd, FormDisplay, StrudentFormDisplay } = require("../Controllers/FormController");
const formidable = require("express-formidable");


//User Routes
router.post("/login", LoginUser)
router.post("/signup", CreateAccount);
router.get("/FormCheck", RoleCheck, FormCheck)

//Form Routes
router.post("/formCreated", requireSignIn, formidable(), FormAdd);
router.get("/FormDispaly", requireSignInAdminCheck, FormDisplay)
router.get("/StudentformDisplay", RoleCheck, StrudentFormDisplay)


router.get("/authentication", RoleCheck, async (req, res) => {
  const Role = req.Role;
  console.log(Role);
  return res.send(Role);
});

module.exports = router