const express = require("express")
const recipeRouter = express.Router()
const recipeController = require("../../controllers/recipe.controller")
const { body } = require("express-validator")


/**
 * @api {get} /recipe/get Get a random receipe depending on the user settings
 * @apiName get
 * @apiGroup Recipe
 *
 * @apiSuccess {json} 
 *          HTTP/1.1 200 OK
 *      {
 *          "insert": "recipe"
 *      }
 * @apiError {json} Error-Response:
 *      {
 *          "error": error,
 *      }
 */
recipeRouter.get(
    '/get',
    recipeController.get
)

recipeRouter.get(
    '/getAllergens',
    recipeController.getAllergens
)

recipeRouter.get(
    '/getCookTypes',
    recipeController.getCookTypes
)

recipeRouter.get(
    '/getParticularities',
    recipeController.getParticularities
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