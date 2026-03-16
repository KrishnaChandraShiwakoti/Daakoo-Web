const Menu = require("../models/menu.js");
const Images = require("../models/images.js");
const Category = require("../models/category.js");
const { checkFileUpload } = require("../utils/fileUploadChecker.js");

const uploadImage = async (req) => {
  const { filename, path } = req.file;
  // Create image record
  const image = await Images.create({
    filename,
    path,
  });
  return image;
};
const AddToCategory = async (req, category) => {
  const categoryRecord = await Category.findOne({
    where: { category_name: category },
  });

  if (!categoryRecord) {
    return res.status(400).json({ message: "Invalid category." });
  }

  const { categoryId } = categoryRecord;

  return categoryId;
};

exports.addMenu = async (req, res) => {
  try {
    const { name, description, price, isSpicy, category, isVegetarian } =
      req.body;
    checkFileUpload(req, res);
    const { image } = uploadImage(req);
    const { categoryId } = AddToCategory(req, category);
    await Menu.create({
      name,
      description,
      price,
      isSpicy,
      isVegetarian,
      category: categoryId,
      images: image.id,
    });

    return res
      .status(201)
      .json({ message: "New Menu Item added successfully." });
  } catch (error) {
    console.log("Error in Add menu function", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
exports.getMenu = async (req, res) => {};
