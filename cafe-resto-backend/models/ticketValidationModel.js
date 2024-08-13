const db = require('./db');

const createTicketValidation = (ticket, callback) => {
    const { user_id, items } = ticket;

    // Vérification des paramètres d'entrée
    if (!user_id || !Array.isArray(items) || items.length === 0) {
        return callback(new Error('Invalid request body. user_id and items array are required.'));
    }

    // Convertir le tableau des items en chaîne JSON sans le champ size
    const itemsJson = JSON.stringify(items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity
    })));

    // Appel à la procédure stockée dans la base de données
    db.query('CALL CreateTicketValidation(?, ?)', [user_id, itemsJson], (err, results) => {
        if (err) return callback(err);

        // Vérifier si les résultats existent et ne sont pas vides
        if (!results || results.length < 2) {
            return callback(new Error('Unexpected result structure from the database.'));
        }

        // Traitement des résultats
        const ticketDetails = results[0] || []; // Le premier jeu de résultats contient les détails du ticket
        const totalAmountResult = results[1][0]; // Le second jeu de résultats contient le montant total
        const totalAmount = totalAmountResult ? totalAmountResult.total_amount : 0;

        callback(null, {
            message: 'Ticket validation created successfully',
            validationDetails: ticketDetails,
            totalAmount: totalAmount
        });
    });
};


const getAllTicketValidations = (callback) => {
    const query = 'SELECT * FROM ticket_validations';
    db.query(query, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

const deleteTicketValidation = (validationId, callback) => {
    const query = 'DELETE FROM ticket_validations WHERE validation_id = ?';
    db.query(query, [validationId], (err, result) => {
        if (err) return callback(err);
        callback(null, result.affectedRows);
    });
};

const deleteAllTicketValidations = (callback) => {
    const query = 'DELETE FROM ticket_validations';
    db.query(query, (err, result) => {
        if (err) return callback(err);
        callback(null, result.affectedRows);
    });
};

module.exports = {
    createTicketValidation,
    getAllTicketValidations,
    deleteTicketValidation,
    deleteAllTicketValidations
};
