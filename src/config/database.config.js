require("dotenv").config();

module.exports = {
  username: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
  uri:
    "mongodb+srv://" +
    process.env.MONGO_USERNAME +
    ":" +
    process.env.MONGO_PASSWORD +
    "@" +
    process.env.MONGO_URL +
    "/" +
    process.env.MONGO_DB +
    "?retryWrites=true&w=majority",
};
