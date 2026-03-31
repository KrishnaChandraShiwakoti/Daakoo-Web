const { default: mongoose } = require("mongoose");

const MenuModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isSpicy: {
    type: Boolean,
    required: true,
  },
  isVegetarian: {
    type: Boolean,
    required: true,
  },
  images: [{ type: mongoose.Schema.ObjectId, ref: "Images" }],
  category: [{ type: mongoose.Schema.ObjectId, ref: "Category" }],
});

const Menu = mongoose.model("Menu", MenuModel);

module.exports = Menu;
