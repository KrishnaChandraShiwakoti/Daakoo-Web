const { default: mongoose } = require("mongoose");

const CategoryModal = new mongoose.Schema({
  name: {
    type: String,
  },
});

const Category = mongoose.model("Category", CategoryModal);

module.exports = Category;
