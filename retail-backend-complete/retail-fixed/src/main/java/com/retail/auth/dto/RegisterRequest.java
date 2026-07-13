package com.retail.auth.dto;
import com.retail.auth.entity.Role;
import jakarta.validation.constraints.*;

public class RegisterRequest {
    @NotBlank(message = "Name is required") private String name;
    @Email @NotBlank(message = "Email is required") private String email;
    @NotBlank @Size(min = 6, message = "Password must be at least 6 characters") private String password;
    private Role role;

    public String getName() { return name; } public void setName(String n) { this.name = n; }
    public String getEmail() { return email; } public void setEmail(String e) { this.email = e; }
    public String getPassword() { return password; } public void setPassword(String p) { this.password = p; }
    public Role getRole() { return role; } public void setRole(Role r) { this.role = r; }
}
