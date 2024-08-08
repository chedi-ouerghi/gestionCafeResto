// models/userModel.js

const bcrypt = require('bcrypt');
const db = require('./db');

// Vérifier les informations de connexion de l'utilisateur
const authenticateUser = (email, password, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) return callback(err);
        if (results.length === 0) {
            return callback(null, null); // Pas d'utilisateur trouvé
        }
        
        const user = results[0];
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) return callback(err);
            if (!result) return callback(null, null); // Mot de passe incorrect
            callback(null, user);
        });
    });
};

const getUserById = (userId, callback) => {
    const query = 'SELECT * FROM users WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
};



module.exports = {
    getUserById,
    authenticateUser
};
