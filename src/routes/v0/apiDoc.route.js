const express = require("express");
const apiDocRouter = express.Router();
var path = require("path");


/**
 * @api {get} /docs/ open a static page of the documentation
 * @apiName /
 * @apiGroup Docs
 */
apiDocRouter.use(
  "/",
  express.static(path.resolve(__dirname + "../../../../apidoc"))
);

module.exports = apiDocRouter;
