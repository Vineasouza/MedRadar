require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const morgan = require("morgan");
const path = require("path");

const app = express();

// sudo service mongod start | status | stop | restart
mongoose
  .connect(process.env.MONGODB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((response) => console.log("Conected to Database.."))
  .catch((error) => console.log("error ->", error.message));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(routes);
app.use(
  "/uploads",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

app.listen(process.env.PORT || 8080);

module.exports = app;
