const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const apiRoutes = require("./routes/api");

app.use("/api", apiRoutes);
app.use(express.json());
app.use(cors());
app.use((res, req, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Content-Type", "application/json");
  next();
});

console.log(process.env.ATLAS_CONNECTION_URL);

mongoose
  .connect(process.env.ATLAS_CONNECTION_URL, { useNewUrlParser: true })
  .then(() => console.log("Database connected succesfully"))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.listen(process.env.PORT, () => {
  console.log("Application is started on PORT = " + process.env.PORT);
});
