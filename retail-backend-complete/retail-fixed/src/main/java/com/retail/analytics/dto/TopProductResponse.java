package com.retail.analytics.dto;

import java.math.BigDecimal;

public class TopProductResponse {
    private Long productId;
    private String productName;
    private Long unitsSold;
    private BigDecimal revenue;

    public TopProductResponse(Long productId, String productName, Long unitsSold, BigDecimal revenue) {
        this.productId = productId; this.productName = productName;
        this.unitsSold = unitsSold; this.revenue = revenue;
    }
    public Long getProductId() { return productId; }
    public String getProductName() { return productName; }
    public Long getUnitsSold() { return unitsSold; }
    public BigDecimal getRevenue() { return revenue; }
}
