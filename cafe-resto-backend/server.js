const express = require('express');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');
const adminRouter = require('./admin/admin');
require('dotenv').config();  

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());  


app.use(express.static(path.join(__dirname, 'build')));


app.use('/api', routes);
app.use('/admin', adminRouter);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
