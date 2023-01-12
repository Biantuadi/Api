const experss = require("express");
const router = experss.Router();
const productController = require("../ctrl/product.ctrl");
const auth = require("../middlewares/auth");

router.get("/products", auth, productController.getProducts);
router.get("/product/:id", auth, productController.getProduct);
router.post("/product/create", auth, productController.createProduct);
router.put("/product/:id", auth, productController.updateProduct);
router.delete("/product/:id", auth, productController.deleteProduct);

module.exports = router;
