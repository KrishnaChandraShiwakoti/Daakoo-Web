const Menu = require("../models/menu.js");
const imageService = require("./ImageService");
const categoryService = require("./CategoryService");

class MenuService {
  async addMenuData(menuData, file) {
    if (!file) {
      throw new Error("No image uploaded.");
    }

    const imageId = await imageService.uploadImage(file);
    const categoryId = await categoryService.getCategoryId(menuData.category);

    const newMenu = await Menu.create({
      name: menuData.DishName,
      description: menuData.description,
      price: menuData.price,
      isSpicy: menuData.isSpicy,
      isVegetarian: menuData.isVegetarian,
      category: categoryId,
      images: [imageId],
    });

    return newMenu;
  }

  async getAllMenus() {
    const menuData = await Menu.find().populate("images").populate("category");
    return menuData.map((dish) => {
      // Extract the category name from the populated category array
      const categoryName =
        dish.category && dish.category.length > 0
          ? dish.category[0].name
          : "Uncategorized";

      return {
        id: dish._id,
        name: dish.name,
        description: dish.description,
        price: dish.price,
        isSpicy: dish.isSpicy,
        isVegetarian: dish.isVegetarian,
        category: categoryName,
        images:
          dish.images && dish.images.length > 0
            ? `/uploads/${dish.images[0].fileName}`
            : null,
      };
    });
  }

  async deleteMenu(menuId) {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      throw new Error("Menu item not found.");
    }

    if (menu.images && menu.images.length > 0) {
      await imageService.deleteImages(menu.images);
    }

    await Menu.findByIdAndDelete(menuId);
  }

  async updateMenu(menuId, updateData) {
    const updatedMenu = await Menu.findByIdAndUpdate(menuId, updateData, {
      new: true,
    });
    return updatedMenu;
  }
}

module.exports = new MenuService();
