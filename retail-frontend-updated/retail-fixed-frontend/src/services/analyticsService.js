// src/services/analyticsService.js
import api from '../api/axiosInstance';

export async function getDailySales(date) {
  const params = date ? { date } : {};
  const { data } = await api.get('/analytics/daily-sales', { params });
  return data;
}

export async function getMonthlySales() {
  const { data } = await api.get('/analytics/monthly-sales');
  return data;
}

export async function getRevenue() {
  const { data } = await api.get('/analytics/revenue');
  return data;
}

export async function getTopProducts(limit = 5) {
  const { data } = await api.get('/analytics/top-products', { params: { limit } });
  return data; // { data: [...] }
}

export async function getCustomerTrends() {
  const { data } = await api.get('/analytics/customer-trends');
  return data;
}

export async function getSalesByCategory() {
  const { data } = await api.get('/analytics/sales-by-category');
  return data; // { data: [...] }
}

export async function getDashboard() {
  const { data } = await api.get('/analytics/dashboard');
  return data;
}
