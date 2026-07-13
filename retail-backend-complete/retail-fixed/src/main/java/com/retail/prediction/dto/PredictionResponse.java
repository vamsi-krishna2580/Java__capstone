package com.retail.prediction.dto;

import java.math.BigDecimal;

public class PredictionResponse {
    private Long productId;
    private String productName;
    private Integer currentStock;
    private BigDecimal averageMonthlySales;
    private BigDecimal predictedDemand;
    private Integer recommendedReorderQuantity;

    public PredictionResponse(Long productId, String productName, Integer currentStock,
                               BigDecimal averageMonthlySales, BigDecimal predictedDemand,
                               Integer recommendedReorderQuantity) {
        this.productId = productId; this.productName = productName;
        this.currentStock = currentStock; this.averageMonthlySales = averageMonthlySales;
        this.predictedDemand = predictedDemand;
        this.recommendedReorderQuantity = recommendedReorderQuantity;
    }
    public Long getProductId() { return productId; }
    public String getProductName() { return productName; }
    public Integer getCurrentStock() { return currentStock; }
    public BigDecimal getAverageMonthlySales() { return averageMonthlySales; }
    public BigDecimal getPredictedDemand() { return predictedDemand; }
    public Integer getRecommendedReorderQuantity() { return recommendedReorderQuantity; }
}
