package com.retail.inventory.controller;

import com.retail.inventory.dto.*;
import com.retail.inventory.service.InventoryService;
import com.retail.product.dto.ProductResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/inventory")
@Tag(name = "Inventory", description = "Stock management")
public class InventoryController {
    private final InventoryService inventoryService;
    public InventoryController(InventoryService inventoryService) { this.inventoryService = inventoryService; }

    @PostMapping("/stock-in") @Operation(summary = "Add stock to a product")
    public ResponseEntity<InventoryTransactionResponse> stockIn(@Valid @RequestBody StockRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(inventoryService.stockIn(request));
    }

    @PostMapping("/stock-out") @Operation(summary = "Remove stock from a product")
    public ResponseEntity<InventoryTransactionResponse> stockOut(@Valid @RequestBody StockRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(inventoryService.stockOut(request));
    }

    @GetMapping("/history") @Operation(summary = "Full inventory transaction history")
    public ResponseEntity<List<InventoryTransactionResponse>> getHistory() {
        return ResponseEntity.ok(inventoryService.getHistory());
    }

    @GetMapping("/low-stock") @Operation(summary = "All products at or below reorder level")
    public ResponseEntity<List<ProductResponse>> getLowStock() {
        return ResponseEntity.ok(inventoryService.getLowStockProducts());
    }
}
