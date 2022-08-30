const express = require("express");
const app = express();
const morgan = require("morgan")
const cors = require("cors")
const v0Router = require("./routes/v0/v0.route")
const cookieParser = require('cookie-parser');

// CORS
app.use(cors())
app.options("*", cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

app.use("/v0/", v0Router)

app.get("/", (req, res) => {
  res.json({
    message: "Hello Didier",
    version: "1.0.0",
  });
});

module.exports = app;
