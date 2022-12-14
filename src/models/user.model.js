const mongoose = require("mongoose");
const { Preference, preferenceSchema } = require("./preference.model");

const userSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  password: { type: String },
  preferences: {
    type: preferenceSchema,
    ref: "Preference",
  },
  recipeDate: {type: Number, default: 0},
  recipe: {type: String, default: ""},
  token: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
