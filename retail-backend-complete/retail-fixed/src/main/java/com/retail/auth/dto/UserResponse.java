package com.retail.auth.dto;

import com.retail.auth.entity.Role;
import com.retail.auth.entity.User;
import java.time.LocalDateTime;

public class UserResponse {
    private Long id;
    private Long userId;       // frontend AuthContext uses user.userId
    private String name;
    private String email;
    private Role role;
    private LocalDateTime createdAt;

    public UserResponse(User u) {
        this.id = u.getId();
        this.userId = u.getId();   // alias
        this.name = u.getName();
        this.email = u.getEmail();
        this.role = u.getRole();
        this.createdAt = u.getCreatedAt();
    }

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public Role getRole() { return role; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
