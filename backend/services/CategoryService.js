const Category = require("../models/category.js");
const Menu = require("../models/menu.js");

class CategoryService {
  async getCategoryId(categoryParam) {
    if (!categoryParam) return undefined;

    let categoryRecord = await Category.findOne({ name: categoryParam });

    // Auto-create category if it doesn't exist to allow adding menus reliably
    if (!categoryRecord) {
      categoryRecord = await Category.create({ name: categoryParam });
    }

    return categoryRecord._id;
  }

  async createCategory(name) {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      throw new Error("Category already exists");
    }
    return await Category.create({ name });
  }

  async getAllCategories() {
    const categories = await Category.find();

    // Get count of menu items per category
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await Menu.countDocuments({
          category: cat._id,
        });
        return {
          id: cat._id,
          name: cat.name,
          count,
        };
      }),
    );

    return categoriesWithCount;
  }

  async getCategoryById(id) {
    return await Category.findById(id);
  }

  async updateCategory(id, name) {
    const existingCategory = await Category.findOne({ name, _id: { $ne: id } });
    if (existingCategory) {
      throw new Error("Category name already exists");
    }
    return await Category.findByIdAndUpdate(id, { name }, { new: true });
  }

  async deleteCategory(id) {
    // Don't delete if category has menu items
    const menuCount = await Menu.countDocuments({ category: id });
    if (menuCount > 0) {
      throw new Error("Cannot delete category with menu items");
    }
    return await Category.findByIdAndDelete(id);
  }
}

module.exports = new CategoryService();
