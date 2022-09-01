const mongoose = require("mongoose");

const exampleSchema = new mongoose.Schema({
  hello: { type: String },
  world: { type: String },
});

const Example = mongoose.model("Example", exampleSchema);

module.exports = { Example };
