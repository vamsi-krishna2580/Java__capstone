package com.retail.billing.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.util.List;

public class BillRequest {
    @NotNull(message = "Customer ID is required") private Long customerId;
    @NotEmpty(message = "At least one item is required") @Valid private List<BillItemRequest> items;
    private BigDecimal tax = BigDecimal.ZERO;
    private BigDecimal discount = BigDecimal.ZERO;

    public Long getCustomerId() { return customerId; } public void setCustomerId(Long v) { this.customerId = v; }
    public List<BillItemRequest> getItems() { return items; } public void setItems(List<BillItemRequest> v) { this.items = v; }
    public BigDecimal getTax() { return tax != null ? tax : BigDecimal.ZERO; }
    public void setTax(BigDecimal v) { this.tax = v; }
    public BigDecimal getDiscount() { return discount != null ? discount : BigDecimal.ZERO; }
    public void setDiscount(BigDecimal v) { this.discount = v; }
}
