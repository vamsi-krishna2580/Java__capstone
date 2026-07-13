package com.retail.customer.controller;

import com.retail.customer.dto.*;
import com.retail.customer.service.CustomerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/customers")
@Tag(name = "Customers", description = "Customer management")
public class CustomerController {

    private final CustomerService customerService;
    public CustomerController(CustomerService customerService) { this.customerService = customerService; }

    @PostMapping
    @Operation(summary = "Create customer")
    public ResponseEntity<CustomerResponse> create(@Valid @RequestBody CustomerRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(customerService.create(request));
    }

    // Returns {data: [...], total: N} shape matching frontend expectation
    @GetMapping
    @Operation(summary = "Get all customers with optional search")
    public ResponseEntity<Map<String, Object>> getAll(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size) {
        Page<CustomerResponse> result = customerService.getAll(search, page, size);
        Map<String, Object> response = new HashMap<>();
        response.put("data", result.getContent());
        response.put("total", result.getTotalElements());
        response.put("page", result.getNumber());
        response.put("totalPages", result.getTotalPages());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get customer by ID")
    public ResponseEntity<CustomerResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(customerService.getById(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update customer")
    public ResponseEntity<CustomerResponse> update(@PathVariable Long id, @Valid @RequestBody CustomerRequest request) {
        return ResponseEntity.ok(customerService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete customer (Admin only)")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        customerService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
