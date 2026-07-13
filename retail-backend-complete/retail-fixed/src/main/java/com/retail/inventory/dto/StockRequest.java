package com.retail.inventory.dto;

import jakarta.validation.constraints.*;

public class StockRequest {
    @NotNull(message = "Product ID is required") private Long productId;
    @NotNull @Min(value = 1, message = "Quantity must be at least 1") private Integer quantity;
    private String reason;

    public Long getProductId() { return productId; } public void setProductId(Long v) { this.productId = v; }
    public Integer getQuantity() { return quantity; } public void setQuantity(Integer v) { this.quantity = v; }
    public String getReason() { return reason; } public void setReason(String v) { this.reason = v; }
}
