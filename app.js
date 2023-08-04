const express = require("express");
const notfound = require("./middleware/not-found");
const asyncErrorHandle = require("./middleware/asyncErrorHandle");
const app = express();
require("express-async-errors");
const products = require("./routes/products");
const { connectDB } = require("./db/connect");
require("dotenv").config();
const port = 5000;

//middleware
app.use(express.json());

//route
app.use("/api/v1/products/", products);
app.use(notfound);
app.use(asyncErrorHandle);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is Listening on ${port}....`));
  } catch (error) {
    console.log(error);
  }
};

start();
