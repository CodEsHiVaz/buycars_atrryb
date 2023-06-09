const bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");
const UserModel = require("../../models/users/usersModel");
require("dotenv").config();
const privateKey = process.env.JWTPRIVETKEY;

/**
 * This is a login function that checks if the user exists and if the password is valid, and returns a
 * token if successful.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, request parameters, request body, etc.
 * @param res - `res` is the response object that is sent back to the client after the server has
 * processed the request. It contains information such as the status code, headers, and response body.
 * In this code snippet, `res` is used to send a response back to the client with a status code,
 * @returns The function `login` is returning a response object with a status code and a JSON object
 * containing a `type`, `message`, and `user` properties. The `type` property indicates whether the
 * response is an error or success. If the login is successful, the `user` property contains the user's
 * name, user ID, and a JSON Web Token (JWT) that can be used for
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).send({
        type: "error",
        message: "Invalid email or user not exist",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({
        type: "error",
        message: "Invalid password",
      });
    }

    const payload = {
      name: user.name,
      email: user.email,
    };
    const token = jwt.sign(payload, privateKey);

    return res.status(200).send({
      type: "success",
      message: "Login successful",
      user: { name: user.name, userId: user._id, token },
    });
  } catch (error) {
    console.log("Login error:", error);
    return res.status(500).send({
      type: "error",
      message: "Something went wrong during login",
      error: error,
    });
  }
};

module.exports = login;
