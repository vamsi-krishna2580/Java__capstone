package com.retail.product.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public class ProductRequest {
    @NotBlank(message = "Product name is required") private String productName;
    @NotBlank(message = "Category is required") private String category;
    private String brand; private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be greater than 0") private BigDecimal price;

    @NotNull(message = "Quantity is required")
    @Min(value = 0, message = "Quantity cannot be negative") private Integer quantity;

    @Min(value = 0, message = "Reorder level cannot be negative") private Integer reorderLevel;
    private String supplier; private String productCode;

    public String getProductName() { return productName; } public void setProductName(String v) { this.productName = v; }
    public String getCategory() { return category; } public void setCategory(String v) { this.category = v; }
    public String getBrand() { return brand; } public void setBrand(String v) { this.brand = v; }
    public String getDescription() { return description; } public void setDescription(String v) { this.description = v; }
    public BigDecimal getPrice() { return price; } public void setPrice(BigDecimal v) { this.price = v; }
    public Integer getQuantity() { return quantity; } public void setQuantity(Integer v) { this.quantity = v; }
    public Integer getReorderLevel() { return reorderLevel; } public void setReorderLevel(Integer v) { this.reorderLevel = v; }
    public String getSupplier() { return supplier; } public void setSupplier(String v) { this.supplier = v; }
    public String getProductCode() { return productCode; } public void setProductCode(String v) { this.productCode = v; }
}
