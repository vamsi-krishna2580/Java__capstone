package com.retail.billing.dto;

import com.retail.billing.entity.BillItem;
import java.math.BigDecimal;

public class BillItemResponse {
    private Long id; private Long productId; private String productName;
    private Integer quantity; private BigDecimal price; private BigDecimal subtotal;

    public BillItemResponse(BillItem item) {
        this.id = item.getId();
        this.productId = item.getProduct().getId();
        this.productName = item.getProduct().getProductName();
        this.quantity = item.getQuantity();
        this.price = item.getPrice();
        this.subtotal = item.getSubtotal();
    }
    public Long getId() { return id; } public Long getProductId() { return productId; }
    public String getProductName() { return productName; } public Integer getQuantity() { return quantity; }
    public BigDecimal getPrice() { return price; } public BigDecimal getSubtotal() { return subtotal; }
}
