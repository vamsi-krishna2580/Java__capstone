// src/services/productService.js
import api from '../api/axiosInstance';

export async function getProducts({ search = '', category = '', page = 0, size = 100 } = {}) {
  const params = { page, size };
  if (search) params.search = search;
  const { data } = await api.get('/products', { params });
  return data; // { data: [...], total: N }
}

export async function getProduct(id) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

export async function createProduct(payload) {
  const { data } = await api.post('/products', payload);
  return data;
}

export async function updateProduct(id, payload) {
  const { data } = await api.put(`/products/${id}`, payload);
  return data;
}

export async function deleteProduct(id) {
  await api.delete(`/products/${id}`);
  return { message: 'Product deleted successfully' };
}

export async function getLowStockProducts() {
  const { data } = await api.get('/products/low-stock');
  return data;
}

export const categories = ['Groceries', 'Electronics', 'Apparel', 'Personal Care', 'Other'];
