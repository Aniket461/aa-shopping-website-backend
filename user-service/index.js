const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3003;

app.use(express.json());

const dbConnection = () => {
  try {
    mongoose
      .connect(
        "mongodb+srv://aishwaryachordia20:symbi207@cluster0.ysl43wk.mongodb.net/aa_shoppingwebsite?retryWrites=true&w=majority&appName=Cluster0"
      )
      .then(console.log("DB Connected successfully"));
  } catch (e) {
    console.log(e);
  }
};

dbConnection();

app.post("/register", (req, res) => {
    console.log(req.body)
  res.send("User added");
});

app.post("/login", (req, res) => {
    res.send("Hello from Express!");
  });

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
