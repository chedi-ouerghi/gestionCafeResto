// controllers/saleController.js

const saleModel = require('../models/saleModel');
const productModel = require('../models/productModel');

// Créer une vente
const createSale = (req, res) => {
    const saleData = req.body;
    saleModel.createSale(saleData, (err, saleId) => {
        if (err) return res.status(500).json({ error: err.message });

        let total = 0;
        let processed = 0;

        saleData.items.forEach(item => {
            productModel.getProductQuantity(item.productId, (err, quantity) => {
                if (err) return res.status(500).json({ error: err.message });
                if (quantity < item.quantity) {
                    return res.status(400).json({ error: 'Not enough stock' });
                }
                saleModel.createSaleDetail(saleId, item.productId, item.quantity, item.price, (err) => {
                    if (err) return res.status(500).json({ error: err.message });

                    productModel.updateProductQuantity(item.productId, item.quantity, (err) => {
                        if (err) return res.status(500).json({ error: err.message });

                        total += item.quantity * item.price;
                        processed++;

                        if (processed === saleData.items.length) {
                            saleModel.updateSale(saleId, { userId: saleData.userId, total }, (err) => {
                                if (err) return res.status(500).json({ error: err.message });
                                res.json({ saleId, total });
                            });
                        }
                    });
                });
            });
        });
    });
};

// Récupérer toutes les ventes
const getAllSales = (req, res) => {
    saleModel.getAllSales((err, sales) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(sales);
    });
};

// Récupérer une vente par ID
const getSaleById = (req, res) => {
    const saleId = parseInt(req.params.id, 10);
    saleModel.getSaleById(saleId, (err, sale) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!sale) return res.status(404).json({ message: 'Sale not found' });
        res.json(sale);
    });
};

// Mettre à jour une vente
const updateSale = (req, res) => {
    const saleId = parseInt(req.params.id, 10);
    const saleData = req.body;
    saleModel.updateSale(saleId, saleData, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Sale updated' });
    });
};

// Supprimer une vente
const deleteSale = (req, res) => {
    const saleId = parseInt(req.params.id, 10);
    saleModel.deleteSale(saleId, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Sale deleted' });
    });
};


const getSaleDetailsBySaleId = (req, res) => {
    const saleId = parseInt(req.params.id, 10);
    saleModel.getSaleDetailsBySaleId(saleId, (err, details) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!details) return res.status(404).json({ message: 'Sale details not found' });
        res.json(details);
    });
};


module.exports = {
    createSale,
    getAllSales,
    getSaleById,
    updateSale,
    deleteSale,
    getSaleDetailsBySaleId
};
