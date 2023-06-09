var jwt = require("jsonwebtoken");
/**
 * This is an asynchronous function that checks if a token exists in the request header and verifies it
 * using a private key, returning an error message if the token is invalid or missing.
 * @param req - The req parameter is an object representing the HTTP request made by the client. It
 * contains information such as the request method, headers, URL, and any data sent in the request
 * body.
 * @param res - `res` stands for response and is an object that represents the HTTP response that an
 * Express app sends when it receives an HTTP request. It contains methods for sending the response
 * back to the client, such as `send()`, `json()`, and `status()`. In the `isAuth`
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the stack. If an error occurs or the request/response cycle is complete, `next` should be called
 * with an argument to signal the error or completion.
 * @returns The function `isAuth` returns either a call to `next()` if the token is verified
 * successfully, or a response with a status code of 500 and an error message if the token is not found
 * or cannot be verified.
 */
const isAuth = async (req, res, next) => {
  var privateKey = await process.env.JWTPRIVETKEY;
  const token = await req.headers.authorization;

  if (token) {
    jwt.verify(token.split(" ")[1], privateKey, function (err, decoded) {
      if (err) {
        return res.status(500).send({
          type: "error",
          message: "unauthorised access ",
          error: err.JsonWebTokenError,
        });
      } else {
        return next();
      }
    });
  } else {
    return res.status(500).send({
      type: "error",
      message: "unauthorised access ",
      error: "no token found",
    });
  }
};
module.exports = isAuth;
