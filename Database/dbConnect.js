const mongoose = require("mongoose");

const { DB_URL, DB_NAME } = process.env;

const connectToDB = async () => {
  try {
    const db = await mongoose.connect(
      DB_URL + DB_NAME
    );
    console.log("Connected to Database", db.connection.port);
  } catch (err) {
    console.error(err, "database connection error");
  }
};

module.exports = connectToDB;
