import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // URL do backend
});

export const fetchCategories = async () => {
  const response = await api.get('/categories/');
  return response.data;
};

export const fetchProductsByCategory = async (categoryId) => {
  const response = await api.get(`/categories/${categoryId}/products/`);
  return response.data;
};

export default api;