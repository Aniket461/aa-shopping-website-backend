const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/ProductModel");
const e = require("express");

const app = express();
const PORT = 3004;

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

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.send({ products: products });
});

app.post("/addproduct", (req, res) => {
  const { name, category, qty, price } = req.body;

  try {
    const product = new Product({
      name: name,
      category: category,
      qty: qty,
      price: price,
    });

    product
      .save()
      .then((data) => {
        res.send({ message: "product added successfully" });
      })
      .catch((e) => {
        res.send({ message: "product addition failed" });
      });
  } catch (error) {
    res.send({ message: "product addition failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
