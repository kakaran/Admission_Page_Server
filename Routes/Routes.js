const express = require("express");
const router = express()
const { RoleCheck } = require("../Middlewares/authentication")
const { CreateAccount, LoginUser } = require("../Controllers/UserController");

//User Routes
router.post("/login",LoginUser)
router.post("/signup",CreateAccount);

router.get("/authentication", RoleCheck, async (req, res) => {
  const Role = req.Role;
  return res.send(Role);
});

module.exports = router