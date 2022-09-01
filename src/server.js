const app = require("./app");
const configDB = require("./config/database.config");
const configApp = require("./config/app.config");
const mongoose = require("mongoose");

mongoose
  .connect(configDB.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to database");

    app.listen(configApp.port, (err) => {
      if (err) throw err;
      console.log("Server running on port", configApp.port);
    });
  })
  .catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
  });
