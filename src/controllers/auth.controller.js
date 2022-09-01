const jwt = require("jsonwebtoken");
const { jwt_token_secret } = require("../config/auth.config");
const {
  CREATED,
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT,
} = require("http-status");

const verifyToken = (req, res, next) => {
  if (!req.headers || !req.headers.authorization) {
    return res
      .status(BAD_REQUEST)
      .send("A token is required for authentication")
      .end();
  }

  const uToken = req.headers.authorization.split(" ")[1];

  if (!uToken) {
    return res
      .status(BAD_REQUEST)
      .send("A token is required for authentication");
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
