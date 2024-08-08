// models/productModel.js

const db = require('./db');

// Récupérer la quantité d'un produit
const getProductQuantity = (productId, callback) => {
    const query = 'SELECT quantity FROM products WHERE product_id = ?';
    db.query(query, [productId], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0] ? results[0].quantity : null);
    });
};

// Mettre à jour la quantité d'un produit
const updateProductQuantity = (productId, quantitySold, callback) => {
    const query = 'UPDATE products SET quantity = quantity - ? WHERE product_id = ?';
    db.query(query, [quantitySold, productId], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// Ajouter un nouveau produit
const addProduct = (product, callback) => {
    const query = 'INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)';
    db.query(query, [product.name, product.price, product.quantity], (err, results) => {
        if (err) return callback(err);
        callback(null, results.insertId);
    });
};


// Mettre à jour un produit
const updateProduct = (productId, product, callback) => {
    const query = 'UPDATE products SET name = ?, price = ?, quantity = ? WHERE product_id = ?';
    db.query(query, [product.name, product.price, product.quantity, productId], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// Récupérer tous les produits
const getAllProducts = (callback) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// Récupérer un produit par ID
const getProductById = (productId, callback) => {
    const query = 'SELECT * FROM products WHERE product_id = ?';
    db.query(query, [productId], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0] ? results[0] : null);
    });
};

module.exports = {
    getProductQuantity,
    updateProductQuantity,
    addProduct,
    updateProduct,
    getAllProducts,
    getProductById
};
