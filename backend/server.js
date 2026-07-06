const express = require("express");
const cors = require("cors");

// Database Connection
require("../database/database");

// Route Imports
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// User Routes
app.use("/api/users", userRoutes);

// Item Routes
app.use("/api/items", itemRoutes);

// Order Routes
app.use("/api/orders", orderRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Backend is running successfully!");
});

// Start Server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});