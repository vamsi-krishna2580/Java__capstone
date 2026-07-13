package com.retail.customer.dto;

import jakarta.validation.constraints.*;

public class CustomerRequest {
    @NotBlank(message = "Name is required") private String name;
    @Email @NotBlank(message = "Email is required") private String email;
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone must be 10 digits") private String phone;
    private String address;

    public String getName() { return name; } public void setName(String v) { this.name = v; }
    public String getEmail() { return email; } public void setEmail(String v) { this.email = v; }
    public String getPhone() { return phone; } public void setPhone(String v) { this.phone = v; }
    public String getAddress() { return address; } public void setAddress(String v) { this.address = v; }
}
