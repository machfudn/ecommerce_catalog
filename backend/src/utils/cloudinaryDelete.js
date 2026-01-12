// utils/cloudinaryDelete.js
const cloudinary = require("../config/cloudinary");

const deleteCloudinaryFile = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Gagal hapus Cloudinary:", err.message);
  }
};

module.exports = deleteCloudinaryFile;
