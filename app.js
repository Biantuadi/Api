const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors()); // CORS

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

app.use(allowCors);
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // pour les formulaires

// db
require("./config/db");

// routes
const userRouter = require("./routes/user.router");
const productRouter = require("./routes/product.router");
app.use("/", userRouter);
app.use("/", productRouter);

module.exports = app;
