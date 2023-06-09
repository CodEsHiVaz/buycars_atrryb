const bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");
const UserModel = require("../../models/users/usersModel");
require("dotenv").config();
const privateKey = process.env.JWTPRIVETKEY;

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

    return res
      .status(200)
      .send({
        type: "success",
        message: "Login successful",
        user: { name: user.name, userId: user._id,token },
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
