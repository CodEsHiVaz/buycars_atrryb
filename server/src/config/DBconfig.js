const mongoose = require("mongoose");
require("dotenv").config();
const dburl = process.env.MONODBURL;
const dbConnection = mongoose
  .connect(dburl)
  .then(() => console.log("successfully connected to Database"))
  .catch((err) => console.log("error", err));

module.exports = dbConnection;
