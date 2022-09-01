const express = require("express");
const recipeRouter = express.Router();
const recipeController = require("../../controllers/recipe.controller");
const { body } = require("express-validator");

recipeRouter.get("/get", recipeController.get);

recipeRouter.get("/getAllergens", recipeController.getAllergens);

recipeRouter.get("/getCookTypes", recipeController.getCookTypes);

recipeRouter.get("/getParticularities", recipeController.getParticularities);

recipeRouter.get("/getDuration", recipeController.getDuration);

recipeRouter.post(
  "/post",
  body("hello").trim().not().isEmpty({ ignore_whitespace: true }),
  body("world").trim().not().isEmpty({ ignore_whitespace: true }),
  recipeController.post
);

module.exports = recipeRouter;
