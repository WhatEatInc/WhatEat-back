const express = require("express")
const recipeRouter = express.Router()
const recipeController = require("../../controllers/recipe.controller")

recipeRouter.get(
    '/get',
    recipeController.get
)

module.exports = recipeRouter