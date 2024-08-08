// models/saleModel.js

const db = require('./db');

// Créer une vente
const createSale = (saleData, callback) => {
    const query = 'INSERT INTO sales (user_id, total) VALUES (?, ?)';
    db.query(query, [saleData.userId, saleData.total], (err, results) => {
        if (err) return callback(err);
        callback(null, results.insertId);
    });
};


// Ajouter un détail de vente
const createSaleDetail = (saleId, productId, quantity, price, callback) => {
    const query = 'INSERT INTO sale_details (sale_id, product_id, quantity, price) VALUES (?, ?, ?, ?)';
    db.query(query, [saleId, productId, quantity, price], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// Récupérer toutes les ventes
const getAllSales = (callback) => {
    const query = 'SELECT * FROM sales';
    db.query(query, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// Récupérer une vente par ID
const getSaleById = (saleId, callback) => {
    const query = 'SELECT * FROM sales WHERE sale_id = ?';
    db.query(query, [saleId], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
};

// Mettre à jour une vente
const updateSale = (saleId, saleData, callback) => {
    const query = 'UPDATE sales SET user_id = ?, total = ? WHERE sale_id = ?';
    db.query(query, [saleData.userId, saleData.total, saleId], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// Supprimer une vente
const deleteSale = (saleId, callback) => {
    const query = 'DELETE FROM sales WHERE sale_id = ?';
    db.query(query, [saleId], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

const getSaleDetailsBySaleId = (saleId, callback) => {
    const query = 'SELECT * FROM sale_details WHERE sale_id = ?';
    db.query(query, [saleId], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

module.exports = {
    createSale,
    createSaleDetail,
    getAllSales,
    getSaleById,
    updateSale,
    deleteSale,
    getSaleDetailsBySaleId
};
