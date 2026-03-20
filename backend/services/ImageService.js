const Images = require("../models/images.js");
const fs = require("fs");
const path = require("path");

class ImageService {
  async uploadImage(file) {
    if (!file) {
      throw new Error("No image uploaded.");
    }
    const { filename, path: filePath } = file;
    const image = await Images.create({
      fileName: filename,
      path: filePath,
    });
    return image._id;
  }

  async deleteImages(imageIds) {
    if (!imageIds || imageIds.length === 0) return;

    for (const imageId of imageIds) {
      const imageRecord = await Images.findById(imageId);
      if (imageRecord && imageRecord.fileName) {
        // Construct the correct file path just like the original implementation
        const filePath = path.join(__dirname, "..", "uploads", imageRecord.fileName);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        await Images.findByIdAndDelete(imageId);
      }
    }
  }
}

module.exports = new ImageService();
