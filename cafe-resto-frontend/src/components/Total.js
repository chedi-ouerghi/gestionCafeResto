
import React from 'react';

function Total({ cart }) {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  
  const styles = {
    container: {
      width: 'max-content',          
      height: '30px',         
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      background: '#ECF0F1',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      marginTop: '15px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    totalAmount: {
      fontSize: '1.4em',
      color: '#000',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <p style={styles.totalAmount}>${total.toFixed(2)}</p>
    </div>
  );
}

export default Total;
