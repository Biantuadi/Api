const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  bio: {
    type: String,
    default: "Quisquam, quod. Lorem ipsum dolor sit amet consectetur.",
  },
  phone: { type: String, default: "+33 6 00 00 00 00" },

  imageUrl: {
    type: String,
    default:
      "https://pbs.twimg.com/media/FiRcVYOXEB4qssI?format=jpg&name=large",
  },

  adress: { type: String, default: "18 rue de la paix, 75000 Paris" },
  role: { type: String, default: "user" },
  date: { type: Date, default: Date.now },
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("users", UserSchema);

//* ccreer un model pour les users avec mysql

// const db = require("../config/database");

// const User = db.define("users", {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   adress: {
//     type: DataTypes.STRING,
//   },
//   role: {
//     type: DataTypes.STRING,
//     defaultValue: "user",
//   },
//   date: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
// });

// module.exports = User;
