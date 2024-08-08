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
    
    userModel.authenticateUser(email, password, (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(401).json({ message: 'Invalid email or password' });
        res.json({ message: 'Login successful', user });
    });
};

module.exports = {
    getUser,
    loginUser,
};
