import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductModal from './ProductModal';
import './HomePageAd.css'; // Assurez-vous que ce fichier CSS existe

function HomePageAd({ user, onLogout }) {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:6202/admin/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleAddProduct = () => {
        setSelectedProduct(null);
        setShowModal(true);
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:6202/admin/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleSubmitProduct = async (product) => {
        try {
            if (selectedProduct) {
                await axios.put(`http://localhost:6202/admin/products/${selectedProduct.product_id}`, product);
            } else {
                await axios.post('http://localhost:6202/admin/products', product);
            }
            setShowModal(false);
            fetchProducts();
        } catch (error) {
            console.error('Error submitting product:', error);
        }
    };

    return (
        <div className="home-page">
            <button className="add-product-btn" onClick={handleAddProduct}>Add Product</button>
            <div className="product-table-container">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.product_id}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.type}</td>
                                <td>{product.description}</td>
                                <td>
                                    <button onClick={() => handleEditProduct(product)}>Edit</button>
                                    <button onClick={() => handleDeleteProduct(product.product_id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ProductModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleSubmitProduct}
                product={selectedProduct}
            />
        </div>
    );
}

export default HomePageAd;
