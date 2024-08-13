const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const ticketValidationController = require('../controllers/ticket_validations');

// Routes utilisateurs
router.get('/users/:id', userController.getUser);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Routes produits
router.post('/products', productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Routes validations de tickets
router.post('/ticket_validations', ticketValidationController.createTicketValidation);
router.get('/ticket_validations', ticketValidationController.getAllTicketValidations);
router.delete('/ticket_validations/:id', ticketValidationController.deleteTicketValidation);
router.delete('/ticket_validations/', ticketValidationController.deleteAllTicketValidations);



module.exports = router;
