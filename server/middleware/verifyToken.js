const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  let token = req.headers.authorization;
  if (!token) return res.status(400).json({ message: "Access Token Required" });
  token = token.split(" ")[1];
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); //return id
    req.user = verified;
    next();
  } catch (err) {
    return res.status(408).json({ message: "Invalid Access Token" });
  }
};
