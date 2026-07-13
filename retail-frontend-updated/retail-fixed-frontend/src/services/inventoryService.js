// src/services/inventoryService.js
import api from '../api/axiosInstance';

export async function getInventory() {
  const { data } = await api.get('/inventory/history');
  return { data: data, total: data.length };
}

export async function stockIn(payload) {
  const { data } = await api.post('/inventory/stock-in', payload);
  return data;
}

export async function stockOut(payload) {
  const { data } = await api.post('/inventory/stock-out', payload);
  return data;
}

export async function getLowStock() {
  const { data } = await api.get('/inventory/low-stock');
  return { data };
}

export async function getInventoryHistory() {
  const { data } = await api.get('/inventory/history');
  return { data };
}

export async function getRecommendations() {
  const { data } = await api.get('/predictions/all');
  return {
    data: data
      .filter(p => p.recommendedReorderQuantity > 0)
      .map(p => ({
        productId: p.productId,
        productName: p.productName,
        currentStock: p.currentStock,
        recommendedStock: p.predictedDemand,
        reorderQuantity: p.recommendedReorderQuantity,
      })),
  };
}
