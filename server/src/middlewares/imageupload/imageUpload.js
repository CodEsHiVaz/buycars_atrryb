const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const imageUploadHandler = async (req, res, next) => {
  cloudinary.config({
    secure: true,
  });
  try {
    const imagePath = req.file.path;

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };
    const result = await cloudinary.uploader.upload(imagePath, options);

    req.locals = {
      url: result,
    };

    fs.unlink(imagePath, (error) => {
      if (error) {
        console.error("Error deleting image:", error);
    
      } else {
        console.log("Image deleted successfully");
      
      }
    });

    return next();
  } catch (error) {
    console.error(error);
  }
};
module.exports = imageUploadHandler;
