const express = require("express");
const app = express();
const cors = require("cors");

// app.use(cors()); // CORS

// app.use((req, res, next) => { 
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
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
