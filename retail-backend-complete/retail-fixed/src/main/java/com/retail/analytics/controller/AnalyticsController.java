package com.retail.analytics.controller;

import com.retail.analytics.dto.*;
import com.retail.analytics.service.AnalyticsService;
import com.retail.product.dto.ProductResponse;
import com.retail.product.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@Tag(name = "Analytics", description = "Sales analytics and dashboard")
public class AnalyticsController {

    private final AnalyticsService analyticsService;
    private final ProductService productService;

    public AnalyticsController(AnalyticsService analyticsService, ProductService productService) {
        this.analyticsService = analyticsService;
        this.productService = productService;
    }

    @GetMapping("/dashboard")
    @Operation(summary = "Full dashboard KPIs")
    public ResponseEntity<DashboardResponse> getDashboard() {
        return ResponseEntity.ok(analyticsService.getDashboard());
    }

    @GetMapping("/total-sales")
    @Operation(summary = "Total number of sales/bills")
    public ResponseEntity<Long> getTotalSales() {
        return ResponseEntity.ok(analyticsService.getTotalSales());
    }

    @GetMapping("/revenue")
    @Operation(summary = "Revenue trend (last 7 days) with profit margin")
    public ResponseEntity<RevenueTrendResponse> getRevenue() {
        return ResponseEntity.ok(analyticsService.getRevenue());
    }

    @GetMapping("/top-products")
    @Operation(summary = "Top 10 selling products by units sold")
    public ResponseEntity<Map<String, Object>> getTopProducts(
            @RequestParam(defaultValue = "5") int limit) {
        List<TopProductResponse> data = analyticsService.getTopProducts();
        Map<String, Object> res = new HashMap<>();
        res.put("data", data.stream().limit(limit).toList());
        return ResponseEntity.ok(res);
    }

    @GetMapping("/low-stock-products")
    @Operation(summary = "Products at or below reorder level")
    public ResponseEntity<List<ProductResponse>> getLowStockProducts() {
        return ResponseEntity.ok(productService.getLowStock());
    }

    @GetMapping("/daily-sales")
    @Operation(summary = "Daily sales breakdown with hourly data")
    public ResponseEntity<DailySalesResponse> getDailySales(
            @RequestParam(required = false) String date) {
        return ResponseEntity.ok(analyticsService.getDailySales(date));
    }

    @GetMapping("/monthly-sales")
    @Operation(summary = "Monthly sales breakdown by day (last 30 days)")
    public ResponseEntity<MonthlySalesResponse> getMonthlySales() {
        return ResponseEntity.ok(analyticsService.getMonthlySales());
    }

    @GetMapping("/sales-by-category")
    @Operation(summary = "Sales grouped by product category")
    public ResponseEntity<Map<String, Object>> getSalesByCategory() {
        Map<String, Object> res = new HashMap<>();
        res.put("data", analyticsService.getSalesByCategory());
        return ResponseEntity.ok(res);
    }

    @GetMapping("/customer-trends")
    @Operation(summary = "Customer growth and activity trends")
    public ResponseEntity<CustomerTrendsResponse> getCustomerTrends() {
        return ResponseEntity.ok(analyticsService.getCustomerTrends());
    }
}
