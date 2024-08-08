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
          const inCart = cart.some(item => item.id === product.id);
          return (
            <div key={product.id} className="product-item">
              <span className="product-name">{product.name}</span>
              <span className="product-price">{product.price} DT</span>
              <button className={`add-button ${inCart ? 'added' : ''}`} onClick={() => addToCart(product)} disabled={inCart}>
                {inCart ? "Ajouté" : "Ajouter"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;
