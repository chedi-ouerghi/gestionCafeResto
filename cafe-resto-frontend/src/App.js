  import React, {  useEffect, useState } from 'react';
  import './App.css';
  import ProductList from './components/ProductListPage';
  import Cart from './components/ProductItem';
  import Total from './components/LoginPage';
  import Ticket from './components/TicketPage';
  import Navbar from './components/Navbar';

  const productsData = [
    { id: 1, name: 'Café Espresso', price: 2, type: 'cafe' },
    { id: 2, name: 'Cappuccino', price: 3.5, type: 'cafe' },
    { id: 3, name: 'Latte', price: 4, type: 'cafe' },
    { id: 4, name: 'Thé Vert', price: 2.5, type: 'cafe' },
    { id: 5, name: 'Croissant', price: 1.5, type: 'tarte' },
    { id: 6, name: 'Pain au Chocolat', price: 2, type: 'tarte' },
    { id: 7, name: 'Sandwich Jambon-Beurre', price: 5, type: 'sandwich' },
    { id: 8, name: 'Salade César', price: 7.5, type: 'salade' },
    { id: 9, name: 'Soupe du Jour', price: 4.5, type: 'salade' },
    { id: 10, name: 'Tarte aux Pommes', price: 3, type: 'tarte' },
    { id: 11, name: 'Muffin aux Myrtilles', price: 2.8, type: 'tarte' },
    { id: 12, name: 'Brownie au Chocolat', price: 3.2, type: 'tarte' },
    { id: 13, name: 'Sandwich Poulet-Graines', price: 6, type: 'sandwich' },
    { id: 14, name: 'Quiche Lorraine', price: 5.5, type: 'tarte' },
    { id: 15, name: 'Salade Grecque', price: 8, type: 'salade' },
    { id: 16, name: 'Tartelette au Citron', price: 3.5, type: 'tarte' },
    { id: 17, name: 'Smoothie Mangue-Banane', price: 4, type: 'boisson' },
    { id: 18, name: 'Thé à la Menthe', price: 2, type: 'boisson' },
    { id: 19, name: 'Soda au Gingembre', price: 2.5, type: 'boisson' },
    { id: 20, name: 'Jus d’Orange Frais', price: 3, type: 'boisson' },
    { id: 21, name: 'Pain Complet', price: 1.2, type: 'pain' },
    { id: 22, name: 'Baguette Tradition', price: 1.5, type: 'pain' },
    { id: 23, name: 'Croissant au Beurre', price: 2, type: 'pain' },
    { id: 24, name: 'Gâteau au Chocolat', price: 4.5, type: 'dessert' },
    { id: 25, name: 'Cheesecake New Yorkais', price: 5, type: 'dessert' },
    { id: 26, name: 'Mousse au Chocolat', price: 3.8, type: 'dessert' },
    { id: 27, name: 'Brioche à la Cannelle', price: 2.8, type: 'pain' }
  ];

  function App() {
    const [cart, setCart] = useState([]);
    const [showTicket, setShowTicket] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [isMoved, setIsMoved] = useState(false);

    const addToCart = (product) => {
      const existingProduct = cart.find((item) => item.id === product.id);
      if (existingProduct) {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    };

    const updateQuantity = (id, quantity) => {
      if (quantity <= 0) {
        setCart(cart.filter((item) => item.id !== id));
      } else {
        setCart(
          cart.map((item) =>
            item.id === id ? { ...item, quantity: quantity } : item
          )
        );
      }
    };

    const removeFromCart = (id) => {
      setCart(cart.filter((item) => item.id !== id));
    };

    const handleValidate = () => {
      setShowTicket(true);
    };

    const handleTypeSelect = (type) => {
      setSelectedType(type);
      setIsMoved(true); // Déplace la .type-selector lorsqu'un type est sélectionné
    };

    const handleResetFilter = () => {
      setSelectedType('');
      setIsMoved(false); // Ramène la .type-selector à sa position initiale
    };

    const filteredProducts = selectedType
      ? productsData.filter((product) => product.type === selectedType)
      : productsData;

    const types = [...new Set(productsData.map(product => product.type))];

    // Gérer l'animation de retour à la position initiale après une sélection
    useEffect(() => {
      if (!selectedType) {
        setIsMoved(false);
      }
    }, [selectedType]);

    return (
      <div className="application">
        <Navbar />
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
          {selectedType && <ProductList products={filteredProducts} cart={cart} addToCart={addToCart}   selectedType={selectedType}  />}
        </div>
        <div className="right">
          <Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
          <Total cart={cart} />
          <button className="validate-button" onClick={handleValidate}>
            Valider
          </button>
        </div>
        {showTicket && <Ticket cart={cart} />}
      </div>
    </div>
        );
  }

  export default App;