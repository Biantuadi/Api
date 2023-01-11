const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// app.use(cors()); // CORS

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST , GET , OPTIONS , PUT , DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
 
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // res.setHeader("Access-Control-Check", htt);


  // Pass to next layer of middleware
  next();
});

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
