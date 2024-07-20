const mongoose = require("mongoose");

const { DB_URL_1, DB_URL_2, DB_USER, DB_PASSWORD } = process.env;

const connectToDB = async () => {
  try {
    const db = await mongoose.connect(
      DB_URL_1 + DB_USER + ":" + DB_PASSWORD + DB_URL_2
    );
    console.log("Connected to Db", db.connection.port);
  } catch (err) {
    console.error(err, "db connection error");
  }
};

module.exports = connectToDB;
