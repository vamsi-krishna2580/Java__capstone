package com.retail.analytics.dto;

import java.math.BigDecimal;
import java.util.List;

public class RevenueTrendResponse {
    private BigDecimal totalRevenue;
    private BigDecimal totalCost;
    private double profitMargin;
    private List<TrendPoint> trend;

    public RevenueTrendResponse(BigDecimal totalRevenue, BigDecimal totalCost, double profitMargin, List<TrendPoint> trend) {
        this.totalRevenue = totalRevenue; this.totalCost = totalCost;
        this.profitMargin = profitMargin; this.trend = trend;
    }

    public static class TrendPoint {
        private String date; private BigDecimal revenue;
        public TrendPoint(String date, BigDecimal revenue) { this.date = date; this.revenue = revenue; }
        public String getDate() { return date; }
        public BigDecimal getRevenue() { return revenue; }
    }

    public BigDecimal getTotalRevenue() { return totalRevenue; }
    public BigDecimal getTotalCost() { return totalCost; }
    public double getProfitMargin() { return profitMargin; }
    public List<TrendPoint> getTrend() { return trend; }
}
