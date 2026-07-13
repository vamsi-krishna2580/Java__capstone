package com.retail.analytics.dto;

import java.math.BigDecimal;

public class DashboardResponse {
    private long totalProducts;
    private long totalCustomers;
    private long totalSales;
    private BigDecimal totalRevenue;
    private long lowStockCount;

    public DashboardResponse(long totalProducts, long totalCustomers,
                              long totalSales, BigDecimal totalRevenue, long lowStockCount) {
        this.totalProducts = totalProducts; this.totalCustomers = totalCustomers;
        this.totalSales = totalSales; this.totalRevenue = totalRevenue;
        this.lowStockCount = lowStockCount;
    }
    public long getTotalProducts() { return totalProducts; }
    public long getTotalCustomers() { return totalCustomers; }
    public long getTotalSales() { return totalSales; }
    public BigDecimal getTotalRevenue() { return totalRevenue; }
    public long getLowStockCount() { return lowStockCount; }
}
