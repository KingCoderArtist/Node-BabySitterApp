const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

require("dotenv").config();

// Database init
require("./db/mongoose");

// Routes
const apiRoutes = require("./routes");

// Middlewares
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api", apiRoutes);

// Authorization token handler
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res.status(403).send({
      success: false,
      message: "No token provided.",
    });
  }
});

// PORT
const port = process.env.PORT || 5000;

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
