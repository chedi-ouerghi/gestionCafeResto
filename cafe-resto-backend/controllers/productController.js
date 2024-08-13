const productModel = require('../models/product');

const createProduct = (req, res) => {
    const product = req.body;

    // Assurez-vous que le produit contient toutes les informations nécessaires
    if (!product.name || typeof product.price !== 'number' || typeof product.quantity !== 'number' || !product.type) {
        return res.status(400).json({ error: 'Invalid product data. name, price, quantity, and type are required.' });
    }

    productModel.createProduct(product, (err, productId) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Product created successfully', productId });
    });
};


const getAllProducts = (req, res) => {
    productModel.getAllProducts((err, products) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(products);
    });
};

const getProductById = (req, res) => {
    const productId = req.params.id;
    productModel.getProductById(productId, (err, product) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    });
};

const updateProduct = (req, res) => {
    const productId = req.params.id;
    const product = req.body;
    productModel.updateProduct(productId, product, (err, rowsAffected) => {
        if (err) return res.status(500).json({ error: err.message });
        if (rowsAffected === 0) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product updated successfully' });
    });
};

const deleteProduct = (req, res) => {
    const productId = req.params.id;
    productModel.deleteProduct(productId, (err, rowsAffected) => {
        if (err) return res.status(500).json({ error: err.message });
        if (rowsAffected === 0) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    });
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
