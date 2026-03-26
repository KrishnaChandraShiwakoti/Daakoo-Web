const categoryService = require("../services/CategoryService.js");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Category name is required" });
    }

    const category = await categoryService.createCategory(name);
    return res
      .status(201)
      .json({ message: "Category created successfully", data: category });
  } catch (error) {
    if (error.message.includes("already exists")) {
      return res.status(400).json({ message: error.message });
    }
    console.error("Error in createCategory:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    return res.status(200).json({ message: "ok", data: categories });
  } catch (error) {
    console.error("Error in getAllCategories:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({ message: "ok", data: category });
  } catch (error) {
    console.error("Error in getCategoryById:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Category name is required" });
    }

    const updatedCategory = await categoryService.updateCategory(id, name);

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res
      .status(200)
      .json({
        message: "Category updated successfully",
        data: updatedCategory,
      });
  } catch (error) {
    if (error.message.includes("already exists")) {
      return res.status(400).json({ message: error.message });
    }
    console.error("Error in updateCategory:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await categoryService.deleteCategory(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res
      .status(200)
      .json({
        message: "Category deleted successfully",
        data: deletedCategory,
      });
  } catch (error) {
    if (error.message.includes("Cannot delete")) {
      return res.status(400).json({ message: error.message });
    }
    console.error("Error in deleteCategory:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
