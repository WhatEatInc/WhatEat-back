const express = require("express")
const apiDocRouter = express.Router()
var path = require('path');

apiDocRouter.use(
    '/',
    express.static(path.resolve(__dirname + "../../../../apidoc"))
);

module.exports = apiDocRouter