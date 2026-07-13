package com.retail.billing.entity;

import com.retail.product.entity.Product;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity @Table(name = "bill_items")
public class BillItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bill_id", nullable = false)
    private Bill bill;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false) private Integer quantity;
    @Column(nullable = false, precision = 10, scale = 2) private BigDecimal price;
    @Column(nullable = false, precision = 10, scale = 2) private BigDecimal subtotal;

    public Long getId() { return id; }
    public Bill getBill() { return bill; } public void setBill(Bill v) { this.bill = v; }
    public Product getProduct() { return product; } public void setProduct(Product v) { this.product = v; }
    public Integer getQuantity() { return quantity; } public void setQuantity(Integer v) { this.quantity = v; }
    public BigDecimal getPrice() { return price; } public void setPrice(BigDecimal v) { this.price = v; }
    public BigDecimal getSubtotal() { return subtotal; } public void setSubtotal(BigDecimal v) { this.subtotal = v; }
}
