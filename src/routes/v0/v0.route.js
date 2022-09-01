const express = require("express");
const v0Router = express.Router();
const recipeRouter = require("./recipe.route");
const userRouter = require("./user.route");
const apiDocRouter = require("./apiDoc.route");

v0Router.use("/recipe", recipeRouter);
v0Router.use("/user", userRouter);
v0Router.use("/docs", apiDocRouter);

module.exports = v0Router;
