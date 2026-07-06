const db = require("../../database/database");

// Place Order
const placeOrder = (order, callback) => {
    const {
        user_id,
        item_id,
        quantity,
        payment_method,
        payment_status
    } = order;

    const sql = `
        INSERT INTO orders
        (
            user_id,
            item_id,
            quantity,
            payment_method,
            payment_status
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            user_id,
            item_id,
            quantity,
            payment_method,
            payment_status
        ],
        callback
    );
};

// Get All Orders (Admin)
const getAllOrders = (callback) => {
    const sql = `
        SELECT
            orders.id,
            orders.user_id,
            users.name AS user_name,
            orders.item_id,
            items.item_name,
            items.price,
            orders.quantity,
            (items.price * orders.quantity) AS total,
            orders.status,
            orders.payment_method,
            orders.payment_status,
            orders.order_date
        FROM orders
        INNER JOIN items
            ON orders.item_id = items.id
        INNER JOIN users
            ON orders.user_id = users.id
        ORDER BY orders.id DESC
    `;

    db.query(sql, callback);
};

// Get Orders By User
const getOrdersByUser = (userId, callback) => {
    const sql = `
        SELECT
            orders.id,
            orders.user_id,
            users.name AS user_name,
            orders.item_id,
            items.item_name,
            items.price,
            orders.quantity,
            (items.price * orders.quantity) AS total,
            orders.status,
            orders.payment_method,
            orders.payment_status,
            orders.order_date
        FROM orders
        INNER JOIN items
            ON orders.item_id = items.id
        INNER JOIN users
            ON orders.user_id = users.id
        WHERE orders.user_id = ?
        ORDER BY orders.id DESC
    `;

    db.query(sql, [userId], callback);
};

// Dashboard Statistics
const getDashboardStats = (callback) => {
    const sql = `
        SELECT
            COUNT(*) AS totalOrders,

            SUM(
                CASE
                    WHEN orders.status='Pending'
                    THEN 1
                    ELSE 0
                END
            ) AS pendingOrders,

            SUM(
                CASE
                    WHEN orders.status='Preparing'
                    THEN 1
                    ELSE 0
                END
            ) AS preparingOrders,

            SUM(
                CASE
                    WHEN orders.status='Delivered'
                    THEN 1
                    ELSE 0
                END
            ) AS deliveredOrders,

            COALESCE(
                SUM(items.price * orders.quantity),
                0
            ) AS totalRevenue

        FROM orders

        INNER JOIN items
            ON orders.item_id = items.id
    `;

    db.query(sql, callback);
};

// Update Order Status
const updateOrderStatus = (id, status, callback) => {
    const sql = `
        UPDATE orders
        SET status = ?
        WHERE id = ?
    `;

    db.query(sql, [status, id], callback);
};

module.exports = {
    placeOrder,
    getAllOrders,
    getOrdersByUser,
    getDashboardStats,
    updateOrderStatus,
};