const db = require('./db');

const createProduct = (product, callback) => {
    const { name, price, quantity, type, description, size } = product;
    const query = 'INSERT INTO products (name, price, quantity, type, description, size) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [name, price, quantity, type, description, size], (err, result) => {
        if (err) return callback(err);
        callback(null, result.insertId);
    });
};


const getAllProducts = (callback) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

const getProductById = (productId, callback) => {
    const query = 'SELECT * FROM products WHERE product_id = ?';
    db.query(query, [productId], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
};

const updateProduct = (productId, product, callback) => {
    const { name, price, quantity, type, description, size } = product;
    const query = 'UPDATE products SET name = ?, price = ?, quantity = ?, type = ?, description = ?, size = ? WHERE product_id = ?';
    db.query(query, [name, price, quantity, type, description, size, productId], (err, result) => {
        if (err) return callback(err);
        callback(null, result.affectedRows);
    });
};

const deleteProduct = (productId, callback) => {
    const query = 'DELETE FROM products WHERE product_id = ?';
    db.query(query, [productId], (err, result) => {
        if (err) return callback(err);
        callback(null, result.affectedRows);
    });
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
