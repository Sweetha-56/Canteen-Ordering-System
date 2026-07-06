const orderModel = require("../models/orderModel");

// Place Order
const placeOrder = (req, res) => {
    const order = req.body;

    orderModel.placeOrder(order, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Error placing order",
                error: err
            });
        }

        res.status(201).json({
            message: "Order placed successfully",
            orderId: result.insertId,
            payment_method: order.payment_method,
            payment_status: order.payment_status
        });
    });
};

// Get All Orders (Admin)
const getAllOrders = (req, res) => {
    orderModel.getAllOrders((err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Error fetching orders",
                error: err
            });
        }

        res.status(200).json(results);
    });
};

// Get Orders of a Particular User
const getOrdersByUser = (req, res) => {
    const userId = req.params.userId;

    orderModel.getOrdersByUser(userId, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Error fetching user orders",
                error: err
            });
        }

        res.status(200).json(results);
    });
};

// Get Dashboard Statistics
const getDashboardStats = (req, res) => {
    orderModel.getDashboardStats((err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Error fetching dashboard statistics",
                error: err
            });
        }

        res.status(200).json(results[0]);
    });
};

// Update Order Status
const updateOrderStatus = (req, res) => {
    const id = req.params.id;
    const { status } = req.body;

    orderModel.updateOrderStatus(id, status, (err) => {
        if (err) {
            return res.status(500).json({
                message: "Error updating order status",
                error: err
            });
        }

        res.status(200).json({
            message: "Order status updated successfully"
        });
    });
};

module.exports = {
    placeOrder,
    getAllOrders,
    getOrdersByUser,
    getDashboardStats,
    updateOrderStatus
};