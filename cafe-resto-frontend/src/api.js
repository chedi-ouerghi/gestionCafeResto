
// src/utils/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:6202/api'; // Remplacez par l'URL de votre API

export const loginUser = (email, password) => {
    return axios.post(`${API_BASE_URL}/login`, { email, password });
};

export const getProducts = () => {
    return axios.get(`${API_BASE_URL}/products`);
};

export const createSale = (saleData) => {
    return axios.post(`${API_BASE_URL}/sales`, saleData);
};

export const getSaleDetails = (saleId) => {
    return axios.get(`${API_BASE_URL}/sales/${saleId}/details`);
};
