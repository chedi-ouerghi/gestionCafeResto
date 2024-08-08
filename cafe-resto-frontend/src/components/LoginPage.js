import React from 'react';

function Total({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className="total">
      <h3>Total: {total.toFixed(2)} DT</h3>
    </div>
  );
}

export default Total;
