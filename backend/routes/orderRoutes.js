const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

// Dashboard Statistics
router.get("/dashboard", orderController.getDashboardStats);

// Get Orders of Logged-in User
router.get("/user/:userId", orderController.getOrdersByUser);

// Place Order
router.post("/", orderController.placeOrder);

// Get All Orders (Admin)
router.get("/", orderController.getAllOrders);

// Update Order Status
router.put("/status/:id", orderController.updateOrderStatus);

module.exports = router;