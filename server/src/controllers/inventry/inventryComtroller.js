const InventoryModel = require("../../models/inventry/inventryModel");

/**
 * This is a JavaScript function that retrieves inventory data based on various query parameters and
 * returns a success message with the data or an error message if no inventory is found.
 * @param req - The request object, which contains information about the incoming HTTP request such as
 * headers, query parameters, and request body.
 * @param res - The `res` parameter is the response object that will be sent back to the client with
 * the result of the API call. It contains methods to set the status code, headers, and body of the
 * response.
 * @returns This function returns either a success response with the inventory data that matches the
 * query parameters or an error response if there is no inventory data found or if there is an error
 * while getting the inventory data.
 */
const getInventry = async (req, res) => {
  try {
    let query = {};
    if (req.query.minPrice && req.query.maxPrice) {
      query = {
        price: {
          $gte: parseInt(req.query.minPrice),
          $lte: parseInt(req.query.maxPrice),
        },
      };
    }
    if (req.query.minMileage && req.query.maxMileage) {
      query = {
        ...query,
        milage: {
          $gte: parseInt(req.query.minMileage),
          $lte: parseInt(req.query.maxMileage),
        },
      };
    }
    if (req.query.color) {
      query = {
        ...query,
        color: req.query.color,
      };
    }
    if (req.query.search) {
      query = {
        ...query,
        modelName: req.query.search,
      };
    }
    const getinv = await InventoryModel.find(query).populate("modelId");

    if (getinv.length > 0) {
      return res.status(200).send({
        type: "success",
        message: "data found",
        data: getinv,
      });
    } else {
      return res.status(400).send({
        type: "error",
        message: "No inventry found",
      });
    }
  } catch (error) {
    console.log("getInventry  error:", error);

    return res.status(500).send({
      type: "error",
      message: "somthing went wrong while getting inventry data",
      error: error,
    });
  }
};

/**
 * This is an asynchronous function that creates an inventory item with the payload data and returns a
 * success message with the created inventory data or an error message with the error object.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, request parameters, request body, etc.
 * @param res - `res` is the response object that is sent back to the client making the request. It
 * contains information such as the status code, headers, and data that is being sent back in response
 * to the request. In this code snippet, `res` is used to send a success or error response back
 * @returns The function `postInventry` is returning a response to the client. If the inventory is
 * created successfully, it returns a success message along with the created inventory data. If there
 * is an error while creating the inventory, it returns an error message along with the error object.
 */
const postInventry = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      image: req.locals.url.secure_url,
    };

    const inventry = await InventoryModel.create(payload);

    return res.status(200).send({
      type: "success",
      message: "inventry created successfully",
      data: inventry,
    });
  } catch (error) {
    console.log("postInventry  error:", error);

    return res.status(500).send({
      type: "error",
      message: "something went wrong while creating the inventory",
      error: error,
    });
  }
};

/**
 * This function retrieves a single inventory item from the database based on its ID and returns it as
 * a response, along with a success or error message.
 * @param req - The request object represents the HTTP request that is made by the client to the
 * server. It contains information about the request such as the URL, headers, parameters, and body.
 * @param res - The "res" parameter is the response object that will be sent back to the client with
 * the result of the API call. It contains methods to set the HTTP status code, headers, and body of
 * the response.
 * @returns This function returns either a success response with the data found for the given inventory
 * ID or an error response if there was an issue with the request or if no data was found for the given
 * ID.
 */
const getSingleInventry = async (req, res) => {
  try {
    const getSingleInventry = await InventoryModel.find({ _id: req.params.id });

    if (getSingleInventry.length > 0) {
      return res.status(200).send({
        type: "success",
        message: "data found",
        data: getSingleInventry[0],
      });
    } else {
      return res.status(400).send({
        type: "error",
        message: `No data found for ${req.params.id}`,
      });
    }
  } catch (error) {
    console.log("getSingleInventry  error:", error);
    return res.status(500).send({
      type: "error",
      message: "something went wrong while fetching the inventory",
      error: error,
    });
  }
};

/**
 * This function deletes multiple inventory items from the database based on their IDs.
 * @param req - The request object, which contains information about the incoming HTTP request such as
 * headers, parameters, and body.
 * @param res - The "res" parameter in the function represents the response object that will be sent
 * back to the client making the request. It contains information such as the status code, headers, and
 * data that will be sent back to the client.
 * @returns The function `deleteInventory` returns a Promise that resolves to an HTTP response object
 * with a status code and a JSON payload containing a `type` (either "success" or "error"), a `message`
 * string, and optionally a `data` or `error` object depending on whether the operation was successful
 * or not.
 */
const deleteInventory = async (req, res) => {
  const inventoryIds = req.body.ids;
  try {
    if (!inventoryIds || inventoryIds.length === 0) {
      return res.status(400).send({
        type: "error",
        message: "No inventory IDs provided",
      });
    } else {
      const deletedInventory = await InventoryModel.deleteMany({
        _id: { $in: inventoryIds },
      });
      return res.status(200).send({
        type: "success",
        message: "Inventories deleted successfully",
        data: deletedInventory,
      });
    }
  } catch (error) {
    console.log("deleteInventory error:", error);
    return res.status(500).send({
      type: "error",
      message: "Something went wrong while deleting inventories",
      error: error,
    });
  }
};

/**
 * This is an asynchronous function that updates an inventory item in a database and returns a success
 * message with the updated data or an error message if the item is not found or an error occurs.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request method, headers, URL, and any data that was sent in the
 * request body.
 * @param res - The "res" parameter in this code refers to the response object that will be sent back
 * to the client making the request. It is used to send HTTP responses with status codes, headers, and
 * data.
 * @returns This function returns a response object with a status code, message, and data (if
 * successful) or error (if unsuccessful). The response object contains information about whether the
 * inventory was successfully updated or not.
 */
const updateInventory = async (req, res) => {
  try {
    const inventoryId = req.params.id;
    const updateData = req.body;

    const updatedInventory = await InventoryModel.findByIdAndUpdate(
      inventoryId,
      updateData
    );

    if (updatedInventory) {
      return res.status(200).send({
        type: "success",
        message: "Inventory updated successfully",
        data: updatedInventory,
      });
    } else {
      return res.status(404).send({
        type: "error",
        message: "Inventory not found",
      });
    }
  } catch (error) {
    console.log("updateInventory error:", error);
    return res.status(500).send({
      type: "error",
      message: "Something went wrong while updating inventory",
      error: error,
    });
  }
};

/**
 * This function filters inventory based on various query parameters and returns the filtered results
 * or an error message.
 * @param req - req is an object that represents the HTTP request made to the server. It contains
 * information such as the request method, headers, query parameters, and body.
 * @param res - `res` is the response object that will be sent back to the client with the filtered
 * inventory data or an error message. It is used to send HTTP responses with status codes and data.
 * @returns The function `filterInventory` is returning either a success response with filtered
 * inventory data or an error response with a message indicating the error that occurred. The success
 * response includes a `type` property set to "success", a `message` property set to "data found", and
 * a `data` property containing the filtered inventory items. The error response includes a `type`
 * property set to "error",
 */
const filterInventory = async (req, res) => {
  // filter-inventory?search=
  try {
    let query = {};
    if (req.query.minPrice && req.query.maxPrice) {
      query = {
        price: {
          $gte: parseInt(req.query.minPrice),
          $lte: parseInt(req.query.maxPrice),
        },
      };
    }
    if (req.query.minMileage && req.query.maxMileage) {
      query = {
        ...query,
        milage: {
          $gte: parseInt(req.query.minMileage),
          $lte: parseInt(req.query.maxMileage),
        },
      };
    }
    if (req.query.color) {
      query = {
        ...query,
        color: req.query.color,
      };
    }

    const filteredInventory = await InventoryModel.find(query);

    if (filteredInventory.length > 0) {
      return res.status(200).send({
        type: "success",
        message: "data found",
        data: filteredInventory,
      });
    } else {
      return res.status(400).send({
        type: "error",
        message: "No inventory items found matching ",
      });
    }
  } catch (error) {
    console.log("filterInventory error:", error);

    return res.status(500).send({
      type: "error",
      message: "Something went wrong while getting inventory",
      error: error,
    });
  }
};

module.exports = {
  getInventry,
  postInventry,
  getSingleInventry,
  deleteInventory,
  updateInventory,
};
