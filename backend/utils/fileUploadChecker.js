exports.checkFileUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded." });
  }
};
