const Category = require("../model/category_model");

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Categories.findAll({
      attributes: ["id", "title", "icon"],
    });
    res.status(200).send(categories);
  } catch (err) {
    console.log(err);
  }
};
