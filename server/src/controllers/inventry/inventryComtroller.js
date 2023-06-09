const InventoryModel = require("../../models/inventry/inventryModel");

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

const updateInventory = async (req, res) => {
  try {
    const inventoryId = req.params.id;
    const updateData = req.body;

    const updatedInventory = await InventoryModel.findByIdAndUpdate(
      inventoryId,
      updateData,
    
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
