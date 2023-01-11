const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: {
    type: String,
    required: true,
    default: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  imageUrl: { type: String, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    // supprimer le produit si l'utilisateur est supprimé
    // delete: "CASCADE",
    delete: "SET NULL",
  },
});

module.exports = mongoose.model("products", ProductSchema);
