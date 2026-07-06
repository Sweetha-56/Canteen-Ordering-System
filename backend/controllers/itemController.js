const itemModel = require("../models/itemModel");

// Add Item
const addItem = (req, res) => {
    const item = req.body;

    itemModel.addItem(item, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Error adding item",
                error: err
            });
        }

        res.status(201).json({
            message: "Item added successfully",
            itemId: result.insertId
        });
    });
};

// Get All Items
const getAllItems = (req, res) => {
    itemModel.getAllItems((err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Error fetching items",
                error: err
            });
        }

        res.status(200).json(result);
    });
};

// Update Item
const updateItem = (req, res) => {
    const id = req.params.id;
    const item = req.body;

    itemModel.updateItem(id, item, (err) => {
        if (err) {
            return res.status(500).json({
                message: "Error updating item",
                error: err
            });
        }

        res.status(200).json({
            message: "Item updated successfully"
        });
    });
};

// Update Availability
const updateAvailability = (req, res) => {
    const id = req.params.id;
    const { availability } = req.body;

    itemModel.updateAvailability(id, availability, (err) => {
        if (err) {
            return res.status(500).json({
                message: "Error updating availability",
                error: err
            });
        }

        res.status(200).json({
            message: "Availability updated successfully"
        });
    });
};

// Delete Item
const deleteItem = (req, res) => {
    const id = req.params.id;

    itemModel.deleteItem(id, (err) => {
        if (err) {
            return res.status(500).json({
                message: "Error deleting item",
                error: err
            });
        }

        res.status(200).json({
            message: "Item deleted successfully"
        });
    });
};

module.exports = {
    addItem,
    getAllItems,
    updateItem,
    updateAvailability,
    deleteItem
};