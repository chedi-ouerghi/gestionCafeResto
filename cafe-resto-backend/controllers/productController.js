// controllers/productController.js

const productModel = require('../models/productModel');

// Récupérer la quantité d'un produit
const getProductQuantity = (req, res) => {
    const productId = req.params.id;
    productModel.getProductQuantity(productId, (err, quantity) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ productId, quantity });
    });
};

// Ajouter plusieurs produits
const createProduct = (req, res) => {
    const products = req.body;
    
    // Vérifier que les produits sont bien un tableau
    if (!Array.isArray(products)) {
        return res.status(400).json({ error: 'Invalid data format' });
    }

    // Fonction pour ajouter un produit
    const addProduct = (product, callback) => {
        productModel.addProduct(product, (err, productId) => {
            if (err) return callback(err);
            callback(null, productId);
        });
    };

    // Liste pour stocker les erreurs et les résultats
    let errors = [];
    let results = [];

    // Ajouter les produits un par un
    let processed = 0;
    products.forEach((product, index) => {
        addProduct(product, (err, productId) => {
            if (err) {
                errors.push({ product, error: err.message });
            } else {
                results.push({ productId, product });
            }
            processed++;

            // Vérifier si tous les produits ont été traités
            if (processed === products.length) {
                if (errors.length > 0) {
                    return res.status(500).json({ errors, results });
                }
                res.status(201).json({ message: 'Products created', results });
            }
        });
    });
};


const updateProduct = async (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = req.body;

    console.log('Données reçues:', product);  // Debug: Afficher les données reçues

    // Vérifier que le produit contient les champs nécessaires
    if (!product.name || !product.price || !product.quantity) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Convertir `price` en nombre flottant
    product.price = parseFloat(product.price);

    // Vérifier que `price` est bien un nombre
    if (isNaN(product.price)) {
        return res.status(400).json({ error: 'Invalid price format' });
    }

    // Vérifier que `quantity` est bien un nombre entier
    if (isNaN(product.quantity) || !Number.isInteger(product.quantity)) {
        return res.status(400).json({ error: 'Invalid quantity format' });
    }

    try {
        // Mettre à jour le produit
        await new Promise((resolve, reject) => {
            productModel.updateProduct(productId, product, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        res.json({ message: 'Product updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Récupérer tous les produits
const getAllProducts = (req, res) => {
    productModel.getAllProducts((err, products) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(products);
    });
};

// Récupérer un produit par ID
const getProductById = (req, res) => {
    const productId = parseInt(req.params.id, 10);
    productModel.getProductById(productId, (err, product) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    });
};

// Mettre à jour la quantité d'un produit
const updateProductQuantity = (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const { quantitySold } = req.body;
    productModel.updateProductQuantity(productId, quantitySold, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Product quantity updated' });
    });
};

module.exports = {
    getProductQuantity,
    updateProductQuantity,
    createProduct,
    updateProduct,
    getAllProducts,
    getProductById
};
