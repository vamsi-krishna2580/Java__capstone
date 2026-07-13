package com.retail.product.controller;

import com.retail.product.dto.*;
import com.retail.product.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@Tag(name = "Products", description = "Product management")
public class ProductController {

    private final ProductService productService;
    public ProductController(ProductService productService) { this.productService = productService; }

    @PostMapping
    @Operation(summary = "Create product")
    public ResponseEntity<ProductResponse> create(@Valid @RequestBody ProductRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.create(request));
    }

    // Returns {data: [...], total: N} shape matching frontend expectation
    @GetMapping
    @Operation(summary = "Get all products with pagination and search")
    public ResponseEntity<Map<String, Object>> getAll(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size,
            @RequestParam(defaultValue = "productName") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        Page<ProductResponse> result = productService.getAll(search, page, size, sortBy, sortDir);
        Map<String, Object> response = new HashMap<>();
        response.put("data", result.getContent());
        response.put("total", result.getTotalElements());
        response.put("page", result.getNumber());
        response.put("totalPages", result.getTotalPages());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get product by ID")
    public ResponseEntity<ProductResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getById(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update product")
    public ResponseEntity<ProductResponse> update(@PathVariable Long id, @Valid @RequestBody ProductRequest request) {
        return ResponseEntity.ok(productService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete product (Admin only)")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/low-stock")
    @Operation(summary = "Get low-stock products")
    public ResponseEntity<List<ProductResponse>> getLowStock() {
        return ResponseEntity.ok(productService.getLowStock());
    }
}
