const express = require("express");
const app = express();

const cors = require('cors')

// CORS
app.use(cors())
app.options('*', cors())

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
    version: "1.0.0",
  });
});

module.exports = app;
