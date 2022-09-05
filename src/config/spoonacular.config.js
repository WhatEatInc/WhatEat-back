require("dotenv").config();

const complexEndpoint = "https://api.spoonacular.com/recipes/complexSearch";
const recipeEndpoint = "https://api.spoonacular.com/recipes/"

module.exports = {
  apiKey: process.env.SPOONACULAR_API_KEY,
  recipeEndpoint: recipeEndpoint,
  complexEndpoint: complexEndpoint
};
