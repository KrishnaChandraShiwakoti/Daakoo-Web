const { default: mongoose } = require("mongoose");

const ItemsModel = new mongoose.Schema({
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
  spiceLevel: {
    type: Number,
    min: 1,
    max: 5,
  },
  images: [{ type: mongoose.Schema.ObjectId, ref: "Images" }],
  category: [{ type: mongoose.Schema.ObjectId, ref: "Category" }],
});

const Items = mongoose.model("Items", ItemsModel);

module.exports = Items;
