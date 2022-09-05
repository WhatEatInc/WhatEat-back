const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    summary: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    steps : {
        type: Array,
        of: Object,
        default: [{}]

    },
    servings: {
        type: Number,
        default: 0
    },
    ingredients: {
        type: Array,
        of: Object,
        default: [{}]
    }
  },
  { minimize: false }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = { Recipe, recipeSchema };
