const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

var mongod = undefined;

async function connect() {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  mongoose.connect(uri);
}

async function closeDatabase() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoose.disconnect()
  await mongod.stop();
}

async function clearDatabase() {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
}

module.exports = {
  connect,
  closeDatabase,
  clearDatabase,
};
