const Product = require("../model/product_model");

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: [
        "id",
        "title",
        "price",
        "image",
        "description",
        "categoryId",
      ],
    });
    res.status(200).send(products);
  } catch (err) {
    console.log(err);
  }
};
