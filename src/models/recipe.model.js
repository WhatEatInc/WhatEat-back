const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    recipeDate: {type: Number, default: 0},
    recipe: {type: String, default: ""},
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = { Recipe, recipeSchema };
