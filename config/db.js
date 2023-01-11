require("dotenv").config();

const mongoose = require('mongoose');

const password = process.env.MONGODB_PASSWORD;
const username = process.env.MONGODB_USERNAME;
const dbName = process.env.MONGODB_DBNAME;
const url = `mongodb+srv://${username}:${password}@cluster0.y0gnr7k.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected 👌')) 
    .catch(err => console.log("MongoDB not connected 😤", err));

module.exports = mongoose;