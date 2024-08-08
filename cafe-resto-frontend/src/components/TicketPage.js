import React from 'react';
import './css/Ticket.css';

function Ticket({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className="ticket">
      <h2>Ticket</h2>
      {cart.map((item) => (
        <div key={item.id} className="ticket-item">
          <span>{item.name}</span>
          <span>{item.quantity}</span>
          <span>{(item.price * item.quantity).toFixed(2)} DT</span>
        </div>
      ))}
      <div className="ticket-total">
        <h3>Total: {total.toFixed(2)} DT</h3>
      </div>
      <button onClick={() => window.print()}>Imprimer</button>
    </div>
  );
}

export default Ticket;


