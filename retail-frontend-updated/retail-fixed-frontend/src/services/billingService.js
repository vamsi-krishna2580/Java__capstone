// src/services/billingService.js
import api from '../api/axiosInstance';

export async function createBill({ customerId, items, tax = 0, discount = 0 }) {
  const { data } = await api.post('/billing/create', { customerId, items, tax, discount });
  return data;
}

export async function getBill(id) {
  const { data } = await api.get(`/billing/${id}`);
  return data;
}

export async function getBillingHistory({ customerId, page = 0, size = 100 } = {}) {
  const params = { page, size };
  if (customerId) params.customerId = customerId;
  const { data } = await api.get('/billing/history', { params });
  return data; // { data: [...], total: N }
}

// Alias used by some pages
export const getTransactionHistory = getBillingHistory;

export async function recordPayment({ billId, paymentMethod, amount }) {
  // Stub - backend auto-marks as PAID on creation
  return { transactionId: Date.now(), billId, paymentMethod, amount, status: 'SUCCESS' };
}
