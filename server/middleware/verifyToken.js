const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); //return id
    req.user = verified;
    next();
  } catch (err) {
    return res.status(408).json({ message: "Invalid Access Token" });
  }
};
