const express = require("express")
const v0Router = express.Router()
const recipeRouter = require("./recipe.route")
const userRouter = require("./user.route")

v0Router.use("/recipe", recipeRouter)
v0Router.use("/user", userRouter)

module.exports = v0Router