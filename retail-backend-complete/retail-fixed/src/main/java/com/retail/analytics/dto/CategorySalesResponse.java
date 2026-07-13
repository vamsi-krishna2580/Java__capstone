package com.retail.analytics.dto;

import java.math.BigDecimal;

public class CategorySalesResponse {
    private String category;
    private BigDecimal value;
    private long count;

    public CategorySalesResponse(String category, BigDecimal value, long count) {
        this.category = category; this.value = value; this.count = count;
    }
    public String getCategory() { return category; }
    public BigDecimal getValue() { return value; }
    public long getCount() { return count; }
}
