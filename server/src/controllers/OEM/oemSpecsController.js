const OemSpecsModel = require("../../models/oemSpecs/oemSpecsModel");
/**
 * This is an asynchronous function that retrieves the count of OEM specifications data and returns a
 * success message with the count or an error message with the error details.
 * @param req - The request object, which contains information about the incoming HTTP request.
 * @param res - The "res" parameter is the response object that will be sent back to the client making
 * the HTTP request. It contains information such as the status code, headers, and the response body.
 * In this case, the response body will contain a JSON object with a "type" property indicating whether
 * the request
 * @returns This function returns a response object with a status code and a message. If the data is
 * successfully fetched from the database, it returns a success message with the count of the data. If
 * there is an error while fetching the data, it returns an error message with the error object.
 */
const geetOemCount = async (req, res) => {
  try {
    const oem = await OemSpecsModel.find({});

    return res.status(200).send({
      type: "success",
      message: "data found",
      Count: oem.length,
    });
  } catch (error) {
    return res.status(500).send({
      type: "error",
      message: "error while fetching data ",
      error: error,
    });
  }
};

/**
 * This function retrieves data from a database and returns a success message with the data if it
 * exists, or an error message if it does not.
 * @param req - The request object represents the HTTP request that was sent by the client to the
 * server. It contains information about the request such as the URL, headers, and any data that was
 * sent in the request body.
 * @param res - The `res` parameter is the response object that will be sent back to the client making
 * the request. It contains methods to set the HTTP status code, headers, and body of the response.
 * @returns This is a function that handles a GET request to retrieve data from a database using the
 * OemSpecsModel. If data is found, a success response with the data is returned. If no data is found,
 * an error response is returned. If there is an error while retrieving the data, an error response
 * with the error message is returned.
 */
const getOemSpecs = async (req, res) => {
  try {
    const getdata = await OemSpecsModel.find({});

    if (getdata.length > 0) {
      return res.status(200).send({
        type: "success",
        message: "data found",
        data: getdata,
      });
    } else {
      return res.status(400).send({
        type: "error",
        message: "No data found",
      });
    }
  } catch (error) {
    return res.status(500).send({
      type: "error",
      message: "somthing went wrong while getting data",
      error: error,
    });
  }
};

/**
 * This function creates a new OEM specification and returns a success message with the created data or
 * an error message with the error details.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, request parameters, request body, etc.
 * @param res - `res` is the response object that is sent back to the client after the server has
 * processed the request. It contains information such as the status code, headers, and response body.
 * In this code snippet, `res` is used to send a success or error response back to the client depending
 * on
 * @returns The function `postOemSpec` is returning a response object with a status code of 200 if the
 * creation of the OEM spec is successful, and a status code of 500 if there is an error. The response
 * object contains a `type` property indicating whether the operation was successful or not, a
 * `message` property with a corresponding message, and a `data` property with the created
 */
const postOemSpec = async (req, res) => {
  try {
    const oemspec = await OemSpecsModel.create(req.body);
    return res.status(200).send({
      type: "success",
      message: "OEM Specs created successfully",
      data: oemspec,
    });
  } catch (error) {
    console.log("postOemSpec  error:", error);
    return res.status(500).send({
      type: "error",
      message: "Creating OEM Spec failed",
      error: error,
    });
  }
};

/**
 * This function retrieves a single OEM specification from a database and returns it as a response,
 * with error handling.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request parameters, headers, and body.
 * @param res - `res` is the response object that is used to send the HTTP response back to the client.
 * It contains methods like `status()` to set the HTTP status code, `send()` to send the response body,
 * and `json()` to send a JSON response.
 * @returns This function returns a response object with a status code and a message, either indicating
 * success and returning the requested data, or indicating an error and providing an error message.
 */
const getSingleOemSpecs = async (req, res) => {
  try {
    const getSigleOem = await OemSpecsModel.find({ _id: req.params.id });

    if (getSigleOem.length > 0) {
      return res.status(200).send({
        type: "success",
        message: "data found",
        data: getSigleOem[0],
      });
    } else {
      return res.status(400).send({
        type: "error",
        message: `No data found for ${req.params.id}`,
      });
    }
  } catch (error) {
    return res.status(500).send({
      type: "error",
      message: "somthing went wrong while getting data",
      error: error,
    });
  }
};

module.exports = { geetOemCount, getOemSpecs, postOemSpec, getSingleOemSpecs };
