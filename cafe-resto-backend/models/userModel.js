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

const registerUser = (email, password, name, phone_number, birth_date, role, callback) => {
    // Hashing the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return callback(err);
        
        // Inserting new user into the database
        const query = 'INSERT INTO users (email, password, name, phone_number, birth_date, role) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [email, hashedPassword, name, phone_number, birth_date, role], (err, results) => {
            if (err) return callback(err);
            callback(null, results.insertId); // Return the new user ID
        });
    });
};

module.exports = {
    getUserById,
    authenticateUser,
    registerUser
};
