package com.retail.billing.dto;

import com.retail.billing.entity.Bill;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class BillResponse {
    private Long id;
    private Long billId;         // frontend uses billId
    private String billNumber;
    private Long customerId;
    private String customerName;
    private LocalDateTime billDate;
    private BigDecimal subtotal;
    private BigDecimal tax;
    private BigDecimal discount;
    private BigDecimal totalAmount;
    private String paymentStatus;
    private List<BillItemResponse> items;

    public BillResponse(Bill bill) {
        this.id = bill.getId();
        this.billId = bill.getId();   // alias
        this.billNumber = bill.getBillNumber();
        this.customerId = bill.getCustomer().getId();
        this.customerName = bill.getCustomer().getName();
        this.billDate = bill.getBillDate();
        this.subtotal = bill.getSubtotal();
        this.tax = bill.getTax();
        this.discount = bill.getDiscount();
        this.totalAmount = bill.getTotalAmount();
        this.paymentStatus = bill.getPaymentStatus();
        this.items = bill.getItems().stream().map(BillItemResponse::new).collect(Collectors.toList());
    }

    public Long getId() { return id; }
    public Long getBillId() { return billId; }
    public String getBillNumber() { return billNumber; }
    public Long getCustomerId() { return customerId; }
    public String getCustomerName() { return customerName; }
    public LocalDateTime getBillDate() { return billDate; }
    public BigDecimal getSubtotal() { return subtotal; }
    public BigDecimal getTax() { return tax; }
    public BigDecimal getDiscount() { return discount; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public String getPaymentStatus() { return paymentStatus; }
    public List<BillItemResponse> getItems() { return items; }
}
