package com.retail.auth.dto;

public class AuthResponse {
    private String token;          // frontend reads data.token
    private String accessToken;    // also expose as accessToken
    private String refreshToken;   // AuthContext stores this
    private String tokenType = "Bearer";
    private UserResponse user;

    public AuthResponse(String accessToken, UserResponse user) {
        this.accessToken = accessToken;
        this.token = accessToken;          // same value, different key name
        this.refreshToken = accessToken;   // no separate refresh for now
        this.user = user;
    }

    public String getToken() { return token; }
    public String getAccessToken() { return accessToken; }
    public String getRefreshToken() { return refreshToken; }
    public String getTokenType() { return tokenType; }
    public UserResponse getUser() { return user; }
}
