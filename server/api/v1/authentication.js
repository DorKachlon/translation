const { Router } = require("express");
const router = Router();
const { User, RefreshToken } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  registerValidation,
  loginValidation,
  tokenValidation,
} = require("../../helperFunctions/validation");
const verifyToken = require("../../middleware/verifyToken");
// const { sendMail } = require("../sendMail");
require("dotenv").config();
const { createNewProgress, removeProgress } = require("../../middleware/progress");

// ! REGISTER
router.post("/register", async (req, res) => {
  try {
    //LETS VALIDATION THE DATA BEFORE
    const { error } = await registerValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    //Checking if the user is already in the database
    const emailExist = await User.findOne({
      where: { email: req.body.email },
    });
    if (emailExist) return res.status(400).send("Email already exists");

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashPassword,
      nativeLanguageId: req.body.nativeLanguageId,
      currentLanguageId: req.body.currentLanguageId,
    };

    const savedUser = await User.create(newUser);
    res.send({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: "Cannot process request" });
  }
});

// ! LOGIN
router.post("/login", async (req, res) => {
  try {
    //LETS VALIDATION THE DATA BEFORE
    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    //Checking if the email exists
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).send("Email or password is wrong"); //here its if user doesn't exist

    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Email or password is wrong");

    //Create and assign a token
    const expired = req.body.rememberMe ? "365 days" : "24h";
    const infoForCookie = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      nativeLanguageId: user.nativeLanguageId,
      currentLanguageId: user.currentLanguageId,
    };
    const refreshToken = jwt.sign(infoForCookie, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: expired,
    });
    console.log(refreshToken);
    const accessToken = jwt.sign(infoForCookie, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "900s",
    });
    const isTokenExist = await RefreshToken.findOne({
      where: {
        email: user.email,
      },
    });
    if (!isTokenExist) {
      await RefreshToken.create({
        email: user.email,
        token: refreshToken,
      });
    } else {
      await RefreshToken.update(
        { token: refreshToken },
        {
          where: {
            email: user.email,
          },
        }
      );
    }
    createNewProgress(infoForCookie);
    res.cookie("fname", user.firstName);
    res.cookie("lname", user.lastName);
    res.cookie("email", user.email);
    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);
    res.send("logged in !");
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: "Cannot process request" });
  }
});

// ! LOGOUT
router.post("/logout", async (req, res) => {
  // Joi Validation
  try {
    const { error } = tokenValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    //for remove Progress I need to know the id user
    const refreshTokenInfo = await RefreshToken.findOne({
      where: {
        token: req.body.token,
      },
    });
    //for remove Progress I need to know the id user
    const userInfo = await User.findOne({
      where: {
        email: refreshTokenInfo.email,
      },
    });
    removeProgress(userInfo);

    const result = await RefreshToken.destroy({
      where: {
        token: req.body.token,
      },
    });
    if (!result) return res.status(400).json({ message: "Refresh Token is required" });
    res.json({ message: "User Logged Out Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: "Cannot process request" });
  }
});

//! Get new access token
router.post("/token", async (req, res) => {
  try {
    // Joi Validation
    const { error } = tokenValidation(req.body);
    if (error) {
      console.error(error.message);
      return res.status(400).json({ success: false, message: "Don't mess with me" });
    }
    const refreshToken = req.body.token;
    const validRefreshToken = await RefreshToken.findOne({
      where: {
        token: refreshToken,
      },
    });
    if (!validRefreshToken) return res.status(403).json({ message: "Invalid Refresh Token" });
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        console.error(error.message);
        return res.status(403).json({ message: "Invalid Refresh Token" });
      }
      delete decoded.iat;
      delete decoded.exp;
      const accessToken = jwt.sign(decoded, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "900s" });
      res.cookie("accessToken", accessToken);
      res.json({ message: "token updated" });
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: "Cannot process request" });
  }
});

// ! validateToken
router.get("/validateToken", verifyToken, (req, res) => {
  res.json({ valid: true });
});

// ! check in the DateBase if user is in the system
async function userIsExist(email) {
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      return user.dataValues;
    }
    return false;
  } catch (error) {
    console.error(error.message);
  }
}
module.exports = router;
