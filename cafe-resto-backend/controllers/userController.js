// controllers/userController.js

const userModel = require('../models/userModel');

const getUser = (req, res) => {
    const userId = req.params.id;
    userModel.getUserById(userId, (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(user);
    });
};

const loginUser = (req, res) => {
    const { email, password } = req.body;
    
    console.log('Login attempt:', { email }); 

    userModel.authenticateUser(email, password, (err, user) => {
        if (err) {
            console.error('Error during authentication:', err); 
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            console.log('Invalid email or password'); 
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        console.log('Login successful:', user); 
        res.json({ message: 'Login successful', user });
    });
};

const registerUser = (req, res) => {
    const { email, password, name, phone_number, birth_date, role } = req.body;

    // Ensure the role is valid (e.g., 'admin' for admin registration)
    if (!['patron', 'user'].includes(role)) {
        return res.status(400).json({ error: 'Invalid role' });
    }

    userModel.registerUser(email, password, name, phone_number, birth_date, role, (err, userId) => {
        if (err) {
            console.error('Error during registration:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User registered successfully', userId });
    });
};

module.exports = {
    getUser,
    loginUser,
    registerUser
};
