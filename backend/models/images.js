const { default: mongoose } = require("mongoose");

const imagesModal = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
});

const Images = mongoose.model("Images", imagesModal);

module.exports = Images;
