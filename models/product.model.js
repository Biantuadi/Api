const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: {
    type: String,
    default: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  imageUrl: { type: String, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    cascade: "deleteMany",
  },
});

module.exports = mongoose.model("products", ProductSchema);
