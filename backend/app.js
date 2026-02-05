const express = require("express");
const morgan = require("morgan");
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("combined"));

//routes

//health check
app.get("/health", (req, res) => {
  res.send("The API is running smoothly!");
});

//404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "NotFound",
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error("unhandled error: ", err);

  res.status(err.status || 500).json({
    error: err.name || "InternalServerError",
    message: err.message || "An unexpected error occurred",
  });
});

module.exports = app;
