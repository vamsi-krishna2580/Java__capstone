package com.retail.auth.dto;
import jakarta.validation.constraints.*;

public class LoginRequest {
    @Email @NotBlank(message = "Email is required") private String email;
    @NotBlank(message = "Password is required") private String password;

    public String getEmail() { return email; } public void setEmail(String e) { this.email = e; }
    public String getPassword() { return password; } public void setPassword(String p) { this.password = p; }
}
