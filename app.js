const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors()); // CORS
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
