const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const path = require("path");
const { auth, requiresAuth } = require("express-openid-connect");
require("dotenv").config();
const route = require("./route.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const url = "mongodb://localhost:27017/GiftShop";
const authMiddleware = require("./middleware/authMiddleware.js");
const { auth0Config } = require("./auth/auth0Config.js");
const port = process.env.PORT || 5000;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

// Connect to MongoDB
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(auth0Config));

console.log("Node Environment:" + process.env.NODE_ENV);

const routeObj = {};
routeObj.app = app;
routeObj.path = path;
routeObj.requiresAuth = requiresAuth();
routeObj.mongoose = mongoose;
authMiddleware(routeObj);
route(routeObj);

// Perform necessary cleanup before shutting down the application
function shutdown() {
  // Close the Mongoose connection
  mongoose.connection.close(function () {
    console.log("Mongoose connection closed");
    process.exit(0);
  });
}

// Register the shutdown event listener
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

app.listen(port, () => {
  console.log(`Server up and listening at port ${port}`);
});
