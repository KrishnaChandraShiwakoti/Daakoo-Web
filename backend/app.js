const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const path = require("path");

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

const userRouter = require("./routes/userRoutes.js");
const menuRouter = require("./routes/menuRoutes.js");

// Middleware
app.use(express.json());
app.use(morgan("combined"));
// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/menu", menuRouter);

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
