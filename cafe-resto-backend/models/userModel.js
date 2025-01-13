// models/userModel.js

const bcrypt = require('bcrypt');
const db = require('./db');


const authenticateUser = (email, password, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) return callback(err);
        if (results.length === 0) {
            return callback(null, null); 
        }
        
        const user = results[0];
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) return callback(err);
            if (!result) return callback(null, null); 
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
    
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return callback(err);
        
        
        const query = 'INSERT INTO users (email, password, name, phone_number, birth_date, role) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [email, hashedPassword, name, phone_number, birth_date, role], (err, results) => {
            if (err) return callback(err);
            callback(null, results.insertId); 
        });
    });
};

module.exports = {
    getUserById,
    authenticateUser,
    registerUser
};
