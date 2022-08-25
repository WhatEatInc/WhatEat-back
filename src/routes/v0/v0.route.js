const express = require("express")
const v0Router = express.Router()
const recipeRouter = require("./recipe.route")

v0Router.use("/recipe", recipeRouter)

module.exports = v0Router