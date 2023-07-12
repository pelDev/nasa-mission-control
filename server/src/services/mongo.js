const mongoose = require("mongoose");
const config = require("../config/config");

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

const MONGO_URL = config.mongoUrl;

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  if (mongoose.connection.readyState) {
    await mongoose.connection.close();
  }
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
