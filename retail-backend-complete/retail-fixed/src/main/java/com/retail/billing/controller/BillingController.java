package com.retail.billing.controller;

import com.retail.billing.dto.*;
import com.retail.billing.service.BillingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/billing")
@Tag(name = "Billing", description = "Sales and billing")
public class BillingController {

    private final BillingService billingService;
    public BillingController(BillingService billingService) { this.billingService = billingService; }

    @PostMapping("/create")
    @Operation(summary = "Create bill — auto deducts inventory")
    public ResponseEntity<BillResponse> createBill(@Valid @RequestBody BillRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(billingService.createBill(request));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get bill by ID")
    public ResponseEntity<BillResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(billingService.getById(id));
    }

    // Returns {data: [...], total: N} shape matching frontend expectation
    @GetMapping("/history")
    @Operation(summary = "Billing history with optional customer filter")
    public ResponseEntity<Map<String, Object>> getHistory(
            @RequestParam(required = false) Long customerId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size) {
        Page<BillResponse> result = billingService.getHistory(customerId, page, size);
        Map<String, Object> response = new HashMap<>();
        response.put("data", result.getContent());
        response.put("total", result.getTotalElements());
        return ResponseEntity.ok(response);
    }
}
