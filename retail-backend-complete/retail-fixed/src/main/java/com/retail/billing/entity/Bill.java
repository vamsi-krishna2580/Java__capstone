package com.retail.billing.entity;

import com.retail.customer.entity.Customer;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity @Table(name = "bills")
public class Bill {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(name = "bill_number", unique = true, nullable = false) private String billNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @Column(name = "bill_date", nullable = false, updatable = false) private LocalDateTime billDate;
    @Column(nullable = false, precision = 10, scale = 2) private BigDecimal subtotal;
    @Column(nullable = false, precision = 10, scale = 2) private BigDecimal tax;
    @Column(nullable = false, precision = 10, scale = 2) private BigDecimal discount;
    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2) private BigDecimal totalAmount;
    @Column(name = "payment_status") private String paymentStatus = "PAID";

    @OneToMany(mappedBy = "bill", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BillItem> items = new ArrayList<>();

    @PrePersist protected void onCreate() {
        billDate = LocalDateTime.now();
        if (billNumber == null) billNumber = "BILL-" + System.currentTimeMillis();
    }

    public Long getId() { return id; }
    public String getBillNumber() { return billNumber; } public void setBillNumber(String v) { this.billNumber = v; }
    public Customer getCustomer() { return customer; } public void setCustomer(Customer v) { this.customer = v; }
    public LocalDateTime getBillDate() { return billDate; }
    public BigDecimal getSubtotal() { return subtotal; } public void setSubtotal(BigDecimal v) { this.subtotal = v; }
    public BigDecimal getTax() { return tax; } public void setTax(BigDecimal v) { this.tax = v; }
    public BigDecimal getDiscount() { return discount; } public void setDiscount(BigDecimal v) { this.discount = v; }
    public BigDecimal getTotalAmount() { return totalAmount; } public void setTotalAmount(BigDecimal v) { this.totalAmount = v; }
    public String getPaymentStatus() { return paymentStatus; } public void setPaymentStatus(String v) { this.paymentStatus = v; }
    public List<BillItem> getItems() { return items; } public void setItems(List<BillItem> v) { this.items = v; }
}
