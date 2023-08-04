const mongoose = require("mongoose");
const { connectDB } = require("./db/connect");
const Products = require("./model/products");
const product_data = require("./product-data.json");
require("dotenv").config();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const prod = Products.create(product_data);
    console.log(prod);
  } catch (error) {
    console.log(error);
  }
};
start();
