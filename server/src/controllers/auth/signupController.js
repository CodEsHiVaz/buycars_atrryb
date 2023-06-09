const bcrypt = require("bcrypt");
const UserModel = require("../../models/users/usersModel");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const privateKey = process.env.JWTPRIVETKEY;

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
            user: { name: user.name, userId: user._id,token },
          });
      })
      .catch((err) => {
        console.log("signup  err:", err);
        if(err.code===11000){
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
