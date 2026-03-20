const Category = require("../models/category.js");

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
}

module.exports = new CategoryService();
