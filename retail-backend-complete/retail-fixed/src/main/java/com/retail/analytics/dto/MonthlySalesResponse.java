package com.retail.analytics.dto;

import java.math.BigDecimal;
import java.util.List;

public class MonthlySalesResponse {
    private String month;
    private BigDecimal totalSales;
    private List<DailyData> dailyBreakdown;

    public MonthlySalesResponse(String month, BigDecimal totalSales, List<DailyData> dailyBreakdown) {
        this.month = month; this.totalSales = totalSales; this.dailyBreakdown = dailyBreakdown;
    }

    public static class DailyData {
        private String date; private BigDecimal sales;
        public DailyData(String date, BigDecimal sales) { this.date = date; this.sales = sales; }
        public String getDate() { return date; }
        public BigDecimal getSales() { return sales; }
    }

    public String getMonth() { return month; }
    public BigDecimal getTotalSales() { return totalSales; }
    public List<DailyData> getDailyBreakdown() { return dailyBreakdown; }
}
