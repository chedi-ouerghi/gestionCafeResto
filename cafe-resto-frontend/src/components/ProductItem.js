import React from 'react';
import './css/Cart.css';

function Cart({ cart, updateQuantity, removeFromCart }) {
  return (
    <div className="cart">
      <h2>Panier</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Votre panier est vide.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="cart-item">
            <span className="item-name">{item.name}</span>
            <div className="quantity-control">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <span className="item-total">{(item.price * item.quantity).toFixed(2)} DT</span>
            <button className="remove-button" onClick={() => removeFromCart(item.id)}>sup</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;