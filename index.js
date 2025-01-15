const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const inventoryRoutes = require("./routes/inventoryRoutes");
const oemRoutes = require("./routes/oemRoutes");
const authRoutes = require('./routes/authRoutes');
const protect = require("./middlewares/protect");
const app = express();

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/oem", oemRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/inventory", protect, inventoryRoutes);

// MongoDB Connection
mongoose
  .connect(DB)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
