import React from 'react';
import './css/Ticket.css';

function Ticket({ validationDetails, totalAmount, onClose }) {
  // Convertir totalAmount en nombre si ce n'est pas déjà un nombre
  const formattedTotalAmount = typeof totalAmount === 'number'
    ? totalAmount
    : parseFloat(totalAmount) || 0;

  // Fonction pour calculer le total pour chaque produit
  const calculateTotal = (total_per_product, total_quantity) => {
    return (parseFloat(total_per_product) * parseFloat(total_quantity)).toFixed(2);
  };

  return (
    <div className="ticket">
      <h2>Ticket de Validation</h2>
      {validationDetails && validationDetails.length > 0 ? (
        <ul className="ticket-list">
          {validationDetails.map((detail) => (
            <li key={detail.product_id} className="ticket-item">
              <span className="product-name">{detail.product_name}</span>
              <span className="product-details">${detail.total_per_product} x {detail.total_quantity}</span>
              <span className="product-total">${calculateTotal(detail.total_per_product, detail.total_quantity)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun détail de validation disponible.</p>
      )}
      <h3 className="ticket-total">Total: ${formattedTotalAmount.toFixed(2)}</h3>
      <button className="close-ticket" onClick={onClose}>Fermer</button>
    </div>
  );
}

export default Ticket;
