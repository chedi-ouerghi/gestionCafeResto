const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Middleware pour vérifier si l'utilisateur est un administrateur
function adminMiddleware(req, res, next) {
    // Cette fonction doit vérifier si l'utilisateur est un administrateur.
    // Vous pouvez utiliser JWT ou session pour vérifier le rôle de l'utilisateur.
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Accès interdit. Administrateur uniquement.' });
    }
}

// CRUD des produits

// Créer un nouveau produit
router.post('/products', adminMiddleware, async (req, res) => {
    const { name, price, quantity, type, description } = req.body;
    try {
        const [result] = await db.promise().query(
            'INSERT INTO products (name, price, quantity, type, description) VALUES (?, ?, ?, ?, ?)',
            [name, price, quantity, type, description]
        );
        res.status(201).json({ product_id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer tous les produits
router.get('/products',  async (req, res) => {
    try {
        const [products] = await db.promise().query('SELECT * FROM products');
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mettre à jour un produit
router.put('/products/:id',  async (req, res) => {
    const { id } = req.params;
    const { name, price, quantity, type, description } = req.body;
    try {
        await db.promise().query(
            'UPDATE products SET name = ?, price = ?, quantity = ?, type = ?, description = ? WHERE product_id = ?',
            [name, price, quantity, type, description, id]
        );
        res.json({ message: 'Produit mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Supprimer un produit
router.delete('/products/:id', adminMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        await db.promise().query('DELETE FROM products WHERE product_id = ?', [id]);
        res.json({ message: 'Produit supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Gestion des utilisateurs

// Récupérer tous les utilisateurs de type "user"
router.get('/users', adminMiddleware, async (req, res) => {
    try {
        const [users] = await db.promise().query('SELECT * FROM users WHERE role = "user"');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer un utilisateur par ID
router.get('/users/:id', adminMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const [user] = await db.promise().query('SELECT * FROM users WHERE user_id = ? AND role = "user"', [id]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(user[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Supprimer un utilisateur
router.delete('/users/:id', adminMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        await db.promise().query('DELETE FROM users WHERE user_id = ? AND role = "user"', [id]);
        res.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Consultation des données de vente pour un utilisateur spécifique avec total des ventes par jour
router.get('/sales/:user_id', adminMiddleware, async (req, res) => {
    const { user_id } = req.params;
    try {
        const [sales] = await db.promise().query('SELECT * FROM sales_summary_view WHERE user_id = ?', [user_id]);
        res.json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour calculer les statistiques de stock
router.get('/stock-statistics', async (req, res) => {
    try {
        const [results] = await db.promise().query('CALL calculate_stock_statistics()');
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour calculer les statistiques de vente par jour
router.get('/daily-sales-statistics', async (req, res) => {
    try {
        const [results] = await db.promise().query('CALL calculate_daily_sales_statistics()');
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
