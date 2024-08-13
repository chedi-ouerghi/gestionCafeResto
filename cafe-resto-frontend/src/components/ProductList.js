import React from 'react';
import './css/ProductList.css';

function ProductList({ products, cart, addToCart, selectedType }) {
  return (
    <div className="product-list">
      <div className="header">
        {selectedType && <h3 className="selected-type">{selectedType}</h3>}
      </div>
      <div className="product-items">
        {products.map((product) => {
          const cartItem = cart.find(item => item.product_id === product.product_id);
          const quantityInCart = cartItem ? cartItem.quantity : 0;
          const inCart = quantityInCart > 0;

          return (
            <div 
              key={product.product_id} 
              className="product-item"
            >
              <span className="product-name">{product.name}</span>
              <span className="product-price">{product.price} DT</span>
              <div className="product-quantity-button">
                <span className="product-quantity">{product.quantity}</span>
                <button
                  className={`add-button ${inCart ? 'added' : ''}`}
                  onClick={() => addToCart(product)}
                  disabled={inCart}
                >
                  {inCart ? "Ajouté" : "Ajouter"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;
