const db = require("../../database/database");

// Add Item
const addItem = (item, callback) => {
    const sql = `
        INSERT INTO items
        (item_name, price, category, image, availability)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            item.item_name,
            item.price,
            item.category,
            item.image,
            item.availability || "Available"
        ],
        callback
    );
};

// Get All Items
const getAllItems = (callback) => {
    const sql = `
        SELECT *
        FROM items
        ORDER BY id
    `;

    db.query(sql, callback);
};

// Update Item
const updateItem = (id, item, callback) => {
    const sql = `
        UPDATE items
        SET
            item_name = ?,
            price = ?,
            category = ?,
            image = ?,
            availability = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            item.item_name,
            item.price,
            item.category,
            item.image,
            item.availability,
            id
        ],
        callback
    );
};

// Update Availability Only
const updateAvailability = (id, availability, callback) => {
    const sql = `
        UPDATE items
        SET availability = ?
        WHERE id = ?
    `;

    db.query(sql, [availability, id], callback);
};

// Delete Item
const deleteItem = (id, callback) => {
    const sql = `
        DELETE FROM items
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};

module.exports = {
    addItem,
    getAllItems,
    updateItem,
    updateAvailability,
    deleteItem
};