require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");
const notFoundMiddleWare = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// route
app.use("/api/v1/products", productsRouter);
app.use(express.json());

// middleware
app.use(notFoundMiddleWare);
app.use(errorMiddleware);

// home route
app.get("/", (req, res) => {
  res.send('<h1>Store API </h1> <a href="/api/v1/products">Product Route</a>');
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Listening on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
