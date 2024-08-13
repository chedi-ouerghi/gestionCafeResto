// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:6202/api'; // Remplacez par l'URL de votre serveur

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchProducts = () => api.get('/products');
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const createTicketValidation = (data) => api.post('/ticket_validations', data);
export const fetchTicketValidations = () => api.get('/ticket_validations');
export const registerUser = (data) => api.post('/register', data);
export const loginUser = (data) => api.post('/login', data);
