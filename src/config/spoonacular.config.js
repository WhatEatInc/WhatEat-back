require("dotenv").config();

const uselessAttributes = [
  "creditsText",
  "license",
  "sourceName",
  "sourceUrl",
  "originalId",
  "veryPopular",
  "gaps",
  "spoonacularSourceUrl",
  "sustainable",
];

const complexEndpoint = "https://api.spoonacular.com/recipes/complexSearch";

module.exports = {
  apiKey: process.env.SPOONACULAR_API_KEY,
  uselessAttributes: uselessAttributes,
  complexEndpoint: complexEndpoint,
};
