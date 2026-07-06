const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itemController");

// Add Item
router.post("/add", itemController.addItem);

// Get All Items
router.get("/", itemController.getAllItems);

// Update Item
router.put("/update/:id", itemController.updateItem);

// Update Item Availability
router.put("/availability/:id", itemController.updateAvailability);

// Delete Item
router.delete("/delete/:id", itemController.deleteItem);

module.exports = router;