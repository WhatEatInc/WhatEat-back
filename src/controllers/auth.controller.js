const jwt = require("jsonwebtoken");
const { jwt_token_secret } = require("../config/auth.config")

const verifyToken = (req, res, next) => {
  const uToken = req.headers["x-access-token"];

  if (!uToken) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(uToken, jwt_token_secret);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;