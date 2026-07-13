package com.retail.product.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(name = "product_code", unique = true, nullable = false) private String productCode;
    @NotBlank @Column(name = "product_name", nullable = false) private String productName;
    @NotBlank @Column(nullable = false) private String category;
    private String brand;
    @Column(columnDefinition = "TEXT") private String description;
    @NotNull @DecimalMin("0.0") @Column(nullable = false, precision = 10, scale = 2) private BigDecimal price;
    @Min(0) @Column(nullable = false) private Integer quantity;
    @Column(name = "reorder_level") private Integer reorderLevel;
    private String supplier;
    @Column(name = "created_at", updatable = false) private LocalDateTime createdAt;
    @Column(name = "updated_at") private LocalDateTime updatedAt;

    @PrePersist protected void onCreate() {
        createdAt = LocalDateTime.now(); updatedAt = LocalDateTime.now();
        if (productCode == null || productCode.isEmpty()) productCode = "PRD-" + System.currentTimeMillis();
    }
    @PreUpdate protected void onUpdate() { updatedAt = LocalDateTime.now(); }

    public Long getId() { return id; } public void setId(Long id) { this.id = id; }
    public String getProductCode() { return productCode; } public void setProductCode(String v) { this.productCode = v; }
    public String getProductName() { return productName; } public void setProductName(String v) { this.productName = v; }
    public String getCategory() { return category; } public void setCategory(String v) { this.category = v; }
    public String getBrand() { return brand; } public void setBrand(String v) { this.brand = v; }
    public String getDescription() { return description; } public void setDescription(String v) { this.description = v; }
    public BigDecimal getPrice() { return price; } public void setPrice(BigDecimal v) { this.price = v; }
    public Integer getQuantity() { return quantity; } public void setQuantity(Integer v) { this.quantity = v; }
    public Integer getReorderLevel() { return reorderLevel; } public void setReorderLevel(Integer v) { this.reorderLevel = v; }
    public String getSupplier() { return supplier; } public void setSupplier(String v) { this.supplier = v; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
