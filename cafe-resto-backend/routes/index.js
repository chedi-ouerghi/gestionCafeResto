const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const saleController = require('../controllers/saleController');
const userController = require('../controllers/userController');

// Produits
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.get('/products/:id/quantity', productController.getProductQuantity);

// Ventes
router.post('/sales', saleController.createSale);
router.get('/sales', saleController.getAllSales);
router.get('/sales/:id', saleController.getSaleById);
router.put('/sales/:id', saleController.updateSale);
router.delete('/sales/:id', saleController.deleteSale);

// Détails des ventes
router.get('/sales/:id/details', saleController.getSaleDetailsBySaleId);


//  users
router.get('/users/:id', userController.getUser);
router.post('/login', userController.loginUser);

module.exports = router;
