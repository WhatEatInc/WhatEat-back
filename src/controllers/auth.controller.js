const jwt = require("jsonwebtoken");
const { jwt_token_secret } = require("../config/auth.config");
const {  BAD_REQUEST } = require("http-status");


/** Verify JWT token, used as a middleware for routes restricted to users logged in */
const verifyToken = (req, res, next) => {
  if (!req.headers || !req.headers.authorization) {
    return res
      .status(BAD_REQUEST)
      .json({
        error: "A token is required for authentication"
      })
      .end();
  }

  const uToken = req.headers.authorization.split(" ")[1];

  if (!uToken) {
    return res
      .status(BAD_REQUEST)
      .json({
        error: "A token is required for authentication"
      })
      .end();
  }

  try {
    const decoded = jwt.verify(uToken, jwt_token_secret);
    req.user = decoded;
  } catch (err) {
    return res
          .status(BAD_REQUEST)
          .json({
            error: "Invalid token"
          }).end();
  }
  return next();
};

module.exports = verifyToken;
