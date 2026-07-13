package com.retail.inventory.dto;

import com.retail.inventory.entity.InventoryTransaction;
import com.retail.inventory.entity.TransactionType;
import java.time.LocalDateTime;

public class InventoryTransactionResponse {
    private Long id; private Long productId; private String productName;
    private Integer quantity; private TransactionType transactionType;
    private String reason; private LocalDateTime transactionDate;

    public InventoryTransactionResponse(InventoryTransaction t) {
        this.id = t.getId();
        this.productId = t.getProduct().getId();
        this.productName = t.getProduct().getProductName();
        this.quantity = t.getQuantity();
        this.transactionType = t.getTransactionType();
        this.reason = t.getReason();
        this.transactionDate = t.getTransactionDate();
    }
    public Long getId() { return id; }
    public Long getProductId() { return productId; }
    public String getProductName() { return productName; }
    public Integer getQuantity() { return quantity; }
    public TransactionType getTransactionType() { return transactionType; }
    public String getReason() { return reason; }
    public LocalDateTime getTransactionDate() { return transactionDate; }
}
