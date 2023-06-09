const bcrypt = require("bcrypt");
const UserModel = require("../../models/users/usersModel");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const privateKey = process.env.JWTPRIVETKEY;

/**
 * This function handles user signup by hashing their password, creating a user object, and returning a
 * JWT token.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, request body, request parameters, etc.
 * @param res - The "res" parameter is the response object that will be sent back to the client after
 * the signup function is executed. It contains information such as the status code, headers, and
 * response body.
 * @returns This function returns a response object with a status code and a JSON object containing a
 * message, user data (name, userId, and token), and possibly an error object if an error occurred
 * during the signup process.
 */
const signup = async (req, res) => {
  try {
    const myPlaintextPassword = req.body.password;
    const salt = await bcrypt.genSaltSync(10);
    const password = await bcrypt.hash(myPlaintextPassword, salt);
    const payload = {
      name: req.body.name,
      email: req.body.email,
      password,
    };

    await UserModel.create(payload)
      .then((user) => {
        const getuser = {
          name: user.name,
          email: user.email,
        };
        var token = jwt.sign(getuser, privateKey);

        return res
          .status(201)

          .send({
            type: "success",
            message: "signup complated successfully",
            user: { name: user.name, userId: user._id, token },
          });
      })
      .catch((err) => {
        console.log("signup  err:", err);
        if (err.code === 11000) {
          return res.status(500).send({
            type: "error",
            message: "user already exist",
            error: err,
          });
        }

        return res.status(500).send({
          type: "error",
          message: "somthing went wrong while signup ",
          error: err,
        });
      });
  } catch (error) {
    return res.status(500).send({
      type: "error",
      message: "somthing went wrong while signup ",
      error: error,
    });
  }
};
module.exports = signup;
