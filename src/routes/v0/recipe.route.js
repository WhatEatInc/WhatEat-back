const express = require("express")
const recipeRouter = express.Router()
const recipeController = require("../../controllers/recipe.controller")
const { body } = require("express-validator")

recipeRouter.get(
    '/get',
    recipeController.get
)

recipeRouter.get(
    '/getAllergen',
    recipeController.getAllergen
)

recipeRouter.get(
    '/getCookType',
    recipeController.getCookType
)

recipeRouter.get(
    '/getParticularity',
    recipeController.getParticularity
)

recipeRouter.get(
    '/getDuration',
    recipeController.getDuration
)

recipeRouter.post(
    '/post',
    body("hello").trim().not().isEmpty({ ignore_whitespace: true}),
    body("world").trim().not().isEmpty({ ignore_whitespace: true}),
    recipeController.post
)

module.exports = recipeRouter