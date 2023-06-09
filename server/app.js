const express = require("express");
const dbConnection = require("./src/config/DBconfig");
const router = require("./src/routes/routes");
const  cors = require("cors")
const path = require("path");
require("dotenv").config();
const Port = process.env.PORT || 8080;
const app = express();
var corsOptions = {
  origin: 'http://localhost:3000',
}


app.use("/temp", express.static(path.join(__dirname, "./temp")));
// console.log(path.join(__dirname, "./temp"))

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.all('*', (req, res) => {
console.log("ROUTES ARE NOT FOUND IN THE REQUEST")
  res.status(404).send('ROUTES ARE NOT FOUND IN THE REQUEST');
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

app.listen(Port, async () => {
  try {
    await dbConnection;

    console.log(`listening on http://localhost:${Port}/`);
  } catch (error) {
    console.log("app.listen  error:", error);

    console.log(`error while listening on ${Port}`);
  }
});
