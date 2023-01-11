const Product = require("../models/product.model");

exports.getProducts = (req, res ) => {
  Product.find()
    .then((products) => {
      res.status(200).json({
        message: "Produit récupéré avec succès",
        products: products,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Produit non récupéré",
        error: error,
      });
    });
};

exports.getProduct = (req, res ) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Produit non trouvé !" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Produit non récupéré",
        error: error,
      });
    });
};

exports.createProduct = (req, res ) => {
  const product = new Product({
    ...req.body,
    price: Number(req.body.price),
  });
  product
    .save()
    .then((createdProduct) => {
      res.status(201).json({
        message: "Produit ajouté avec succès",
        product: {
          ...createdProduct,
          id: createdProduct._id,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Produit non ajouté",
        error: error,
      });
    });
};

exports.updateProduct = (req, res ) => {
  const product = new Product({
    _id: req.params.id,
    ...req.body,
    price: Number(req.body.price),
  });
  Product.updateOne({ _id: req.params.id }, product)
    .then(() => {
      res.status(201).json({
        message: "Produit modifié avec succès",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Produit non modifié",
        error: error,
      });
    });
};

exports.deleteProduct = (req, res ) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Produit supprimé avec succès",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Produit non supprimé",
        error: error,
      });
    });
};
