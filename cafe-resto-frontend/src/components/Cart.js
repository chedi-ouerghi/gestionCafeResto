// src/components/Cart.js
import React from 'react';
import './css/Cart.css';

function Cart({ cart, updateQuantity, removeFromCart }) {

  return (
    <div className="cart">
      <h2>Panier</h2>
      {cart.length === 0 ? (
        <div className="empty-cart-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100"
            height="100"
            className="empty-cart-svg"
          >
            <circle cx="12" cy="12" r="10" stroke="#053f5c" strokeWidth="2" fill="none" />
            <path
              d="M12 6v6l4 2"
              stroke="#053f5c"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <animate
              attributeName="stroke"
              values="#053f5c;#f27f0c;#053f5c"
              dur="1s"
              repeatCount="indefinite"
            />
          </svg>
          <p className="empty-cart-message">
            Votre panier est vide. Prenez une pause et préparez-vous à servir les clients ! Chaque nouvelle vente est une opportunité d’exceller et de briller.
          </p>
        </div>
      ) : (
        <div className="cart-items-container">
          {cart.map(item => (
            <div className="cart-item" key={item.product_id}>
              <span>{item.name}</span>
              <span>{item.price} DT</span>
              
              <div className="quantity-control">
                <button
                  onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button className="remove-button" onClick={() => removeFromCart(item.product_id)}>Supprimer</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
