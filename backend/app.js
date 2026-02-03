const express = require("express");
const app = express();

// Middleware
app.use(express.json());

//routes

//health check
app.get("/health", (req, res) => {
  res.send("The API is running smoothly!");
});

module.exports = app;
