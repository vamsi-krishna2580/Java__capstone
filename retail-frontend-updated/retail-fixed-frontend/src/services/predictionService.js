// src/services/predictionService.js
import api from '../api/axiosInstance';

export async function getDemandPredictions() {
  const { data } = await api.get('/predictions/all');
  return { data };
}

export async function getReorderRecommendations() {
  const { data } = await api.get('/predictions/all');
  return {
    data: data
      .filter(p => p.recommendedReorderQuantity > 0)
      .map(({ productId, productName, currentStock, predictedDemand, recommendedReorderQuantity }) => ({
        productId, productName,
        currentStock,
        recommendedStock: predictedDemand,
        reorderQuantity: recommendedReorderQuantity,
      })),
  };
}

export async function getForecast(productId) {
  const { data } = await api.get(`/predictions/product/${productId}`);
  return data;
}
