require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("./Database/dbConnect");
const bcrypt = require("bcrypt");
const User = require("./Models/userSchema");
const Blog = require("./Models/blogSchema");

let PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());


connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server started on port " + PORT);
    });
  })
  .catch((err) => {
    console.error("Server not started", err.errorMessage);
  });



app.post("/register", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    password = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password });
    const data = await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.find({ email: email });
    if (user.email === email) {
      if (user.password === password) {
        res.status(200).send({ message: "User logged in successfully" });
      }
    } else {
      res.status(403).send({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post("/add-blog", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newBlog = new Blog({ title, description });
    const data = await newBlog.save();
    res
      .status(201)
      .json({ success: true, message: "Blog created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to my blog website");
});
