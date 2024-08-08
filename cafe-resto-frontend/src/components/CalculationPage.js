// src/components/CalculationPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSale } from '../api';

const CalculationPage = () => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [total, setTotal] = useState(cart.reduce((acc, item) => acc + item.price, 0));
    const navigate = useNavigate();

    const handleConfirmSale = async () => {
        const userId = localStorage.getItem('userId');
        const saleData = {
            userId,
            total,
            items: cart.map(item => ({ productId: item.product_id, quantity: 1, price: item.price }))
        };
        try {
            await createSale(saleData);
            localStorage.removeItem('cart');
            navigate('/ticket');
        } catch (error) {
            console.error('Failed to create sale:', error);
        }
    };

    return (
        <div>
            <h1>Calculation Page</h1>
            <ul>
                {cart.map(item => (
                    <li key={item.product_id}>
                        {item.name} - ${item.price}
                    </li>
                ))}
            </ul>
            <h2>Total: ${total}</h2>
            <button onClick={handleConfirmSale}>Confirm Sale</button>
        </div>
    );
};

export default CalculationPage;
