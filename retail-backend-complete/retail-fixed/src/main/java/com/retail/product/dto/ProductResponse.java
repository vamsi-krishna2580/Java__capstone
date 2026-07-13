package com.retail.product.dto;

import com.retail.product.entity.Product;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ProductResponse {
    private Long id;
    private Long productId;      // frontend uses productId
    private String productCode;
    private String productName;
    private String category;
    private String brand;
    private String description;
    private BigDecimal price;
    private Integer quantity;
    private Integer reorderLevel;
    private String supplier;
    private String stockStatus;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ProductResponse(Product p) {
        this.id = p.getId();
        this.productId = p.getId();   // alias
        this.productCode = p.getProductCode();
        this.productName = p.getProductName();
        this.category = p.getCategory();
        this.brand = p.getBrand();
        this.description = p.getDescription();
        this.price = p.getPrice();
        this.quantity = p.getQuantity();
        this.reorderLevel = p.getReorderLevel();
        this.supplier = p.getSupplier();
        this.createdAt = p.getCreatedAt();
        this.updatedAt = p.getUpdatedAt();
        if (p.getQuantity() == 0) this.stockStatus = "OUT_OF_STOCK";
        else if (p.getReorderLevel() != null && p.getQuantity() <= p.getReorderLevel()) this.stockStatus = "LOW_STOCK";
        else this.stockStatus = "IN_STOCK";
    }

    public Long getId() { return id; }
    public Long getProductId() { return productId; }
    public String getProductCode() { return productCode; }
    public String getProductName() { return productName; }
    public String getCategory() { return category; }
    public String getBrand() { return brand; }
    public String getDescription() { return description; }
    public BigDecimal getPrice() { return price; }
    public Integer getQuantity() { return quantity; }
    public Integer getReorderLevel() { return reorderLevel; }
    public String getSupplier() { return supplier; }
    public String getStockStatus() { return stockStatus; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
