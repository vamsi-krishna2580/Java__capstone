package com.retail.analytics.dto;

public class CustomerTrendsResponse {
    private long totalCustomers;
    private long newThisMonth;
    private long activeCustomers;

    public CustomerTrendsResponse(long totalCustomers, long newThisMonth, long activeCustomers) {
        this.totalCustomers = totalCustomers;
        this.newThisMonth = newThisMonth;
        this.activeCustomers = activeCustomers;
    }
    public long getTotalCustomers() { return totalCustomers; }
    public long getNewThisMonth() { return newThisMonth; }
    public long getActiveCustomers() { return activeCustomers; }
}
