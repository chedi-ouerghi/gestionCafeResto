import React from 'react';
import './Cart.css';

function Cart({ cart }) {
  return (
    <div className="cart">
      <h2>Panier</h2>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <span>{item.name}</span>
          <span>{item.quantity}</span>
          <span>{item.price * item.quantity} DT</span>
        </div>
      ))}
    </div>
  );
}

export default Cart;
