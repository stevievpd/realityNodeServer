const express = require("express");
const router = express.Router();

const categoriesController = require("../controller/category_controller");

router.get("/get-all-categories", categoriesController.getAllCategories);

module.exports = router;
