const menuService = require("../services/MenuService.js");

exports.addMenu = async (req, res) => {
  try {
    const newMenu = await menuService.addMenuData(req.body, req.file);
    return res
      .status(201)
      .json({ message: "New Menu Item added successfully.", data: newMenu });
  } catch (error) {
    if (error.message === "Invalid category." || error.message === "No image uploaded.") {
      return res.status(400).json({ message: error.message });
    }
    console.log("Error in Add menu function:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getMenu = async (req, res) => {
  try {
    const result = await menuService.getAllMenus();
    res.status(200).json({ message: "ok", data: result });
  } catch (error) {
    console.log("Error in getMenu function:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    await menuService.deleteMenu(req.params.id);
    res.status(200).json({ message: "Menu item deleted successfully." });
  } catch (error) {
    if (error.message === "Menu item not found.") {
      return res.status(404).json({ message: error.message });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateMenu = async (req, res) => {
  try {
    const { name, description, price, isSpicy, category, isVegetarian } = req.body;
    await menuService.updateMenu(req.params.id, {
      name,
      description,
      price,
      isSpicy,
      isVegetarian,
      category,
    });
    res.status(200).json({ message: "Menu item updated successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
