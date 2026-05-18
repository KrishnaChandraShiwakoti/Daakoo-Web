const mongoose = require("mongoose");

const mongoConnect = () => {
  const DB_URL = process.env.DB_URL;
  return mongoose.connect(DB_URL);
};

module.exports = mongoConnect;
