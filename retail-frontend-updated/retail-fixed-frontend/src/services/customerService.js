// src/services/customerService.js
import api from '../api/axiosInstance';

export async function getCustomers({ search = '', page = 0, size = 100 } = {}) {
  const params = { page, size };
  if (search) params.search = search;
  const { data } = await api.get('/customers', { params });
  return data; // { data: [...], total: N }
}

export async function getCustomer(id) {
  const { data } = await api.get(`/customers/${id}`);
  return data;
}

export async function createCustomer(payload) {
  const { data } = await api.post('/customers', payload);
  return data;
}

export async function updateCustomer(id, payload) {
  const { data } = await api.put(`/customers/${id}`, payload);
  return data;
}

export async function deleteCustomer(id) {
  await api.delete(`/customers/${id}`);
  return { message: 'Customer deleted successfully' };
}
