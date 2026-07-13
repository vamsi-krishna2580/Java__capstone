package com.retail.billing.dto;

import jakarta.validation.constraints.*;

public class BillItemRequest {
    @NotNull(message = "Product ID is required") private Long productId;
    @NotNull @Min(value = 1, message = "Quantity must be at least 1") private Integer quantity;

    public Long getProductId() { return productId; } public void setProductId(Long v) { this.productId = v; }
    public Integer getQuantity() { return quantity; } public void setQuantity(Integer v) { this.quantity = v; }
}
