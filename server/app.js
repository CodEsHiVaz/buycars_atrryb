const express = require("express");
const dbConnection = require("./src/config/DBconfig");
const router = require("./src/routes/routes");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const Port = process.env.PORT || 8080;
const app = express();
var corsOptions = {
  origin: "http://localhost:3000",
};

app.use("/temp", express.static(path.join(__dirname, "./temp")));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);


/* `app.all("*", (req, res) => {...})` is a middleware function that handles all requests that do not
match any of the defined routes. It logs a message to the console indicating that the requested
route is not found and sends a 404 status code with a message "REQUESTED ROUTE ARE NOT FOUND" to the
client. This is useful for handling invalid requests and preventing the server from crashing. */
app.all("*", (req, res) => {
  console.log("REQUESTED ROUTE ARE NOT FOUND");
  res.status(404).send("REQUESTED ROUTE ARE NOT FOUND");
});
/* for testing api response . */
app.get("/", async (req, res) => {
  try {
    res.status(200).json({ message: "Hello, wellcome! to my site" });
  } catch (error) {
    console.log("app.get  error:", error);
    res.status(500).json({ message: error.message });
  }
});

/* This code is starting the server and listening on a specified port (either the port specified in the
environment variable `PORT` or port 8080 if `PORT` is not defined). When the server starts, it first
waits for the database connection to be established (using the `await` keyword with the
`dbConnection` promise), and then logs a message to the console indicating that the server is
listening on the specified port. If there is an error while starting the server, it logs an error
message to the console. */
app.listen(Port, async () => {
  try {
    await dbConnection;

    console.log(`listening on http://localhost:${Port}/`);
  } catch (error) {
    console.log("app.listen  error:", error);

    console.log(`error while listening on ${Port}`);
  }
});
