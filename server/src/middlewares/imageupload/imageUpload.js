const cloudinary = require("cloudinary").v2;
const fs = require("fs");

/**
 * This is a JavaScript function that handles image uploads to Cloudinary and deletes the uploaded
 * image from the local file system.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, request parameters, and request body. In this
 * case, it is used to access the uploaded image file through req.file.path.
 * @param res - `res` is the response object that is used to send a response back to the client making
 * the request. It contains methods and properties that allow you to set the response status, headers,
 * and body. In this specific code snippet, `res` is not being used directly, but it may be
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the stack. It is typically used to chain multiple middleware functions together to handle a request.
 * @returns the result of the `next()` function call, which will pass control to the next middleware
 * function in the chain.
 */
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
