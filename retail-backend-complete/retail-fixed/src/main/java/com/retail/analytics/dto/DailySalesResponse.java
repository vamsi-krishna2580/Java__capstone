package com.retail.analytics.dto;

import java.math.BigDecimal;
import java.util.List;

public class DailySalesResponse {
    private String date;
    private BigDecimal totalSales;
    private long transactionCount;
    private List<HourlyData> hourlyBreakdown;

    public DailySalesResponse(String date, BigDecimal totalSales, long transactionCount, List<HourlyData> hourlyBreakdown) {
        this.date = date; this.totalSales = totalSales;
        this.transactionCount = transactionCount; this.hourlyBreakdown = hourlyBreakdown;
    }

    public static class HourlyData {
        private String hour; private BigDecimal sales;
        public HourlyData(String hour, BigDecimal sales) { this.hour = hour; this.sales = sales; }
        public String getHour() { return hour; }
        public BigDecimal getSales() { return sales; }
    }

    public String getDate() { return date; }
    public BigDecimal getTotalSales() { return totalSales; }
    public long getTransactionCount() { return transactionCount; }
    public List<HourlyData> getHourlyBreakdown() { return hourlyBreakdown; }
}
