package com.retail.customer.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Entity @Table(name = "customers")
public class Customer {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @NotBlank @Column(nullable = false) private String name;
    @Email @Column(unique = true, nullable = false) private String email;
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone must be 10 digits") private String phone;
    private String address;
    @Column(name = "loyalty_points") private Integer loyaltyPoints = 0;
    @Column(name = "created_at", updatable = false) private LocalDateTime createdAt;
    @Column(name = "updated_at") private LocalDateTime updatedAt;

    @PrePersist protected void onCreate() { createdAt = LocalDateTime.now(); updatedAt = LocalDateTime.now(); }
    @PreUpdate  protected void onUpdate() { updatedAt = LocalDateTime.now(); }

    public Long getId() { return id; } public void setId(Long id) { this.id = id; }
    public String getName() { return name; } public void setName(String v) { this.name = v; }
    public String getEmail() { return email; } public void setEmail(String v) { this.email = v; }
    public String getPhone() { return phone; } public void setPhone(String v) { this.phone = v; }
    public String getAddress() { return address; } public void setAddress(String v) { this.address = v; }
    public Integer getLoyaltyPoints() { return loyaltyPoints; }
    public void setLoyaltyPoints(Integer v) { this.loyaltyPoints = v; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
