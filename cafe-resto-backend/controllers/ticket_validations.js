const ticketValidationModel = require('../models/ticketValidationModel');

const createTicketValidation = (req, res) => {
    const { user_id, items } = req.body;

    // Vérification des champs requis
    if (!user_id || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Invalid request body. user_id and items array are required.' });
    }

    ticketValidationModel.createTicketValidation({ user_id, items }, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json(result);
    });
};

const getAllTicketValidations = (req, res) => {
    ticketValidationModel.getAllTicketValidations((err, validations) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(validations);
    });
};

const deleteTicketValidation = (req, res) => {
    const validationId = req.params.id;

    if (!validationId) {
        return res.status(400).json({ error: 'Validation ID is required' });
    }

    ticketValidationModel.deleteTicketValidation(validationId, (err, rowsAffected) => {
        if (err) return res.status(500).json({ error: err.message });
        if (rowsAffected === 0) return res.status(404).json({ message: 'Ticket validation not found' });
        res.json({ message: 'Ticket validation deleted successfully' });
    });
};

const deleteAllTicketValidations = (req, res) => {
    ticketValidationModel.deleteAllTicketValidations((err, rowsAffected) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'All ticket validations deleted successfully' });
    });
};

module.exports = {
    createTicketValidation,
    getAllTicketValidations,
    deleteTicketValidation,
    deleteAllTicketValidations
};
