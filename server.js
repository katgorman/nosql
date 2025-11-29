const express = require("express"); // import express framework
const mongoose = require("mongoose"); // import mongoose for MongoDB
const path = require("path"); // import path for handling file paths
const cors = require("cors"); // import cors to handle cross-origin requests

const app = express(); // create express app

// middleware
app.use(express.json()); // parse incoming JSON requests
app.use(cors()); // enable CORS for all routes
app.use(express.static(path.join(__dirname, "public"))); // serve static files from 'public' folder

// connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/no-sql", {
  useNewUrlParser: true, // use new URL parser
  useUnifiedTopology: true, // use new server discovery and monitoring engine
});

// check connection
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error:", err);
});

// routes
app.use("/api/items", require("./routes/items")); // attach items routes at /api/items

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});