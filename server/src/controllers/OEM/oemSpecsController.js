const OemSpecsModel = require("../../models/oemSpecs/oemSpecsModel");
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
