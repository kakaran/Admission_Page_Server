const JWT = require("jsonwebtoken");
const User = require("../Models/User");
const {
  HashPassword,
  ComparePassword,
} = require("../Middlewares/authpassword");

// cloudinary.config({
//     cloud_name: process.env.cloud_name,
//     api_key: process.env.api_key,
//     api_secret: process.env.api_secret,
// });

const CreateAccount = async (req, res) => {
  try {
    const { FName, LName, Email, PhoneNo, Password } = req.body;

    if (!FName || !LName || !Email || !PhoneNo || !Password) {
      return res.status(500).send({
        message: "Kindly please fill all information...",
        status: false,
      });
    }

    if (
      Email.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      )
    )
      return res
        .status(500)
        .send({ message: "Wrong email format", status: false });

    if (
      Password.match(
        / ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      )
    )
      return res
        .status(500)
        .send({ message: "Wrong password format", status: false });

    const CheckEmail = await User.findOne({ Email: Email.toLowerCase() });

    if (CheckEmail) {
      return res
        .status(500)
        .send({ message: "Email allready exist", status: false });
    }

    const hashPassword = await HashPassword(Password);
    // console.log(hashPassword);
    await new User({
      FName,
      LName,
      Email: Email.toLowerCase(),
      PhoneNo,
      Password: hashPassword,
      Role: "Student",
    }).save();

    return res
      .status(200)
      .send({ message: "Account Successfully Created", status: true });
  } catch (error) {
    console.log(error);
  }
};

//Login Account
const LoginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res.status(400).send({
        message: "Kindly please enter your email and password",
        status: false,
      });
    }

    const UserCheck = await User.findOne({ Email: Email.toLowerCase() });

    if (!UserCheck)
      return res
        .status(400)
        .send({ message: "Not vailed user ", status: false });

    const match = await ComparePassword(Password, UserCheck.Password);

    if (!match)
      return res.status(500).send({ message: "Wrong Detail", status: false });

    const token = await JWT.sign(
      { _id: UserCheck._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).send({
      message: "Login Successfully",
      token,
      status: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const FormCheck = async (req, res) => {
  try {
    const statusCheck = await User.find({ _id: req.user._id });

    if (statusCheck.formId)
      return res
        .status(200)
        .send({ message: "allredy Submiited", status: false });
    else
      return res
        .status(200)
        .send({ message: "Form not created ", status: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  CreateAccount,
  LoginUser,
  FormCheck,
};
