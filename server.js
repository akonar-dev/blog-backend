require("dotenv").config();
const express = require("express");
const app = express();

let PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to my blog website");
});

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
