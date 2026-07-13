package com.retail.inventory.entity;

import com.retail.product.entity.Product;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Entity @Table(name = "inventory_transactions")
public class InventoryTransaction {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @NotNull @Min(1) @Column(nullable = false) private Integer quantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_type", nullable = false)
    private TransactionType transactionType;

    private String reason;

    @Column(name = "transaction_date", nullable = false, updatable = false)
    private LocalDateTime transactionDate;

    @PrePersist protected void onCreate() { transactionDate = LocalDateTime.now(); }

    public Long getId() { return id; }
    public Product getProduct() { return product; } public void setProduct(Product v) { this.product = v; }
    public Integer getQuantity() { return quantity; } public void setQuantity(Integer v) { this.quantity = v; }
    public TransactionType getTransactionType() { return transactionType; }
    public void setTransactionType(TransactionType v) { this.transactionType = v; }
    public String getReason() { return reason; } public void setReason(String v) { this.reason = v; }
    public LocalDateTime getTransactionDate() { return transactionDate; }
}
