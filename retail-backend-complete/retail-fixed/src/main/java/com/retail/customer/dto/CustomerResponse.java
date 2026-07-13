package com.retail.customer.dto;

import com.retail.customer.entity.Customer;
import java.time.LocalDateTime;

public class CustomerResponse {
    private Long id;
    private Long customerId;     // frontend uses customerId
    private String name;
    private String email;
    private String phone;
    private String address;
    private Integer loyaltyPoints;
    private LocalDateTime createdAt;

    public CustomerResponse(Customer c) {
        this.id = c.getId();
        this.customerId = c.getId();   // alias
        this.name = c.getName();
        this.email = c.getEmail();
        this.phone = c.getPhone();
        this.address = c.getAddress();
        this.loyaltyPoints = c.getLoyaltyPoints();
        this.createdAt = c.getCreatedAt();
    }

    public Long getId() { return id; }
    public Long getCustomerId() { return customerId; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getAddress() { return address; }
    public Integer getLoyaltyPoints() { return loyaltyPoints; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
