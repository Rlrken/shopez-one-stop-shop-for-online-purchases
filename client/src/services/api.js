import axios from 'axios';

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`
});

// Attach token if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('shopez_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Auth ──────────────────────────────────────────────
export const registerUser = (data) => API.post('/users/register', data);
export const loginUser    = (data) => API.post('/users/login', data);

// ── Products ──────────────────────────────────────────
export const getProducts = ()     => API.get('/products');
export const addProduct  = (data) => API.post('/products', data);

// ── Orders ────────────────────────────────────────────
export const createOrder = (data) => API.post('/orders', data);
export const getOrders   = ()     => API.get('/orders');

export default API;
