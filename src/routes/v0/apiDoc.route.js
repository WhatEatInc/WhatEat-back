const express = require("express");
const apiDocRouter = express.Router();
var path = require("path");


/**
 * @api {get} /docs/ Open docs
 * @apiName docs
 * @apiGroup Docs
 * 
 */
apiDocRouter.use(
  "/",
  express.static(path.resolve(__dirname + "../../../../apidoc"))
);

module.exports = apiDocRouter;
