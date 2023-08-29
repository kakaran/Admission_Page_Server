const JWT = require("jsonwebtoken");
const secretkey = process.env.JWT_SECRET;
const User = require("../Models/User")

const requireSignIn = async (req, res, next) => {
  try {
    JWT.verify(req.headers.authtok, secretkey, (err, auth) => {
      if (auth) {
        req.user = auth;
        next();
      } else {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const RoleCheck = async (req, res, next) => {
  try {
    JWT.verify(req.headers.authtok, secretkey, async (err, auth) => {
      if (auth) {
        const _id = auth._id;
        const user = await User.findById({ _id: _id }).select("Role");
        if (user) {
          req.Role = user.Role;
          req.user = user
          next();
        } else {
          res.status(200).send({ message: "UnAuthorized User", status: false });
        }
      } else console.log(err);
    });
  } catch (error) {
    console.log(error);
  }
};


const requireSignInAdminCheck = async (req, res, next) => {
  try {
    JWT.verify(req.headers.authtok, secretkey, async (err, auth) => {
      if (auth) {
        const user = await User.findById({ _id: auth._id }, { Role: 1 });
        if (user.Role === "Admin") {
          req.user = auth;
          next();
        } else
          return res
            .status(200)
            .send({ message: "UnAuthorized User", status: false });
      } else {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};




module.exports = {
  requireSignIn,
  RoleCheck,
  requireSignInAdminCheck
};