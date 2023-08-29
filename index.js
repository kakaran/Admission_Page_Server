const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const dbconect = require("./Config/dbconfig");
const Router = require("./Routes/Routes");
const PORT = process.env.PORT || 5000;


dbconect();

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cors({ origin: true }));
app.use(morgan("dev"));
app.use("/api", Router);

app.listen(PORT, function (error) {
  if (error) {
    console.log("Server Not Work");
  }

  console.log("Server start Successfully Port no is : " + PORT);
});