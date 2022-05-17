const mongoose = require("mongoose");

exports.connect = async () => {
  await mongoose.connect("mongodb://localhost:27017/test", {});
};

exports.close = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

exports.clear = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};
