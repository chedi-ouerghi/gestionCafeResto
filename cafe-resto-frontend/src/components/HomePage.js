import React, { useEffect, useState, useCallback } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';
import Total from './Total';
import Ticket from './Ticket';
import { fetchProducts, createTicketValidation } from '../api';

function HomePage() {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [showTicket, setShowTicket] = useState(false);
    const [validationDetails, setValidationDetails] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [selectedType, setSelectedType] = useState('');
    const [isMoved, setIsMoved] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProducts()
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const addToCart = useCallback((product) => {
        const existingProduct = cart.find((item) => item.product_id === product.product_id);
        if (existingProduct) {
            setCart(
                cart.map((item) =>
                    item.product_id === product.product_id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    }, [cart]);

    const updateQuantity = useCallback((id, quantity) => {
        if (quantity <= 0) {
            setCart(cart.filter((item) => item.product_id !== id));
        } else {
            setCart(
                cart.map((item) =>
                    item.product_id === id ? { ...item, quantity } : item
                )
            );
        }
    }, [cart]);

    const removeFromCart = useCallback((id) => {
        setCart(cart.filter((item) => item.product_id !== id));
    }, [cart]);

    const handleValidate = () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            setError('Utilisateur non connecté.');
            return;
        }

        const ticketData = {
            user_id: userId,
            items: cart.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity
                
            }))
        };

        createTicketValidation(ticketData)
            .then(response => {
                const { validationDetails, totalAmount } = response.data;
                setShowTicket(true);
                setValidationDetails(validationDetails);
                setTotalAmount(totalAmount);
                setError('');
            })
            .catch(error => {
                console.error('Error validating ticket:', error);
                setError('Erreur lors de la validation du ticket.');
            });
    };

    const handleTypeSelect = useCallback((type) => {
        setSelectedType(type);
        setIsMoved(true);
    }, []);

    const handleResetFilter = useCallback(() => {
        setSelectedType('');
        setIsMoved(false);
    }, []);

    const handleCloseTicket = () => {
        
        setCart([]);
        
        setShowTicket(false);
    };

    const filteredProducts = selectedType
        ? products.filter((product) => product.type === selectedType)
        : products;

    const types = [...new Set(products.map(product => product.type))];

    useEffect(() => {
        if (!selectedType) {
            setIsMoved(false);
        }
    }, [selectedType]);

    return (
        <div className="application">
            <div className="app-container">
                <div className="left">
                    <div className={`type-selector ${isMoved ? 'moved' : ''}`}>
                        {selectedType === '' ? (
                            types.map(type => (
                                <button className="types-button" key={type} onClick={() => handleTypeSelect(type)}>
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))
                        ) : (
                            <button className="reset-button" onClick={handleResetFilter}>
                                Retour aux types
                            </button>
                        )}
                    </div>
                    {selectedType && <ProductList products={filteredProducts} cart={cart} addToCart={addToCart} selectedType={selectedType} />}
                </div>
                <div className="right">
                    <Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
                    <Total cart={cart} />
                    <button
                        className={`validate-button ${cart.length === 0 ? 'disabled' : ''}`}
                        onClick={handleValidate}
                        disabled={cart.length === 0}
                    >
                        Valider
                    </button>
                    {error && <div className="error-message">{error}</div>}
                </div>
                {showTicket && (
                    <Ticket
                        validationDetails={validationDetails}
                        totalAmount={totalAmount}
                        onClose={handleCloseTicket}
                    />
                )}
            </div>
        </div>
    );
}

export default HomePage;
