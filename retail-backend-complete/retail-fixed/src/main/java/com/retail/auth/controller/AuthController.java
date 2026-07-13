package com.retail.auth.controller;

import com.retail.auth.dto.*;
import com.retail.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "Register, Login, Profile, Password Reset")
public class AuthController {

    private final AuthService authService;
    public AuthController(AuthService authService) { this.authService = authService; }

    @PostMapping("/register")
    @Operation(summary = "Register a new user")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request));
    }

    @PostMapping("/login")
    @Operation(summary = "Login and get JWT")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/profile")
    @Operation(summary = "Get logged-in user profile")
    public ResponseEntity<UserResponse> profile(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(authService.getProfile(userDetails.getUsername()));
    }

    /** Frontend calls POST /api/auth/forgot-password?email=... */
    @PostMapping("/forgot-password")
    @Operation(summary = "Request password reset (stub — extend with email service)")
    public ResponseEntity<Map<String, String>> forgotPassword(@RequestParam String email) {
        authService.forgotPassword(email);
        return ResponseEntity.ok(Map.of("message",
                "If an account exists for " + email + ", a reset link has been sent."));
    }

    /** Frontend calls POST /api/auth/reset-password with {token, newPassword} */
    @PostMapping("/reset-password")
    @Operation(summary = "Reset password using token")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request);
        return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
    }
}
