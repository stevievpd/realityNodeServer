const express = require("express");
const router = express.Router();

const productController = require("../controller/product_controller");

router.get("/get-all-products", productController.getAllProducts);

module.exports = router;
