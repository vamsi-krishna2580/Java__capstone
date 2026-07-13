package com.retail.prediction.controller;

import com.retail.prediction.dto.PredictionResponse;
import com.retail.prediction.service.PredictionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/predictions")
@Tag(name = "Predictions", description = "Inventory demand forecasting (3-month moving average)")
public class PredictionController {
    private final PredictionService predictionService;
    public PredictionController(PredictionService predictionService) { this.predictionService = predictionService; }

    @GetMapping("/product/{productId}") @Operation(summary = "Predict demand for a specific product")
    public ResponseEntity<PredictionResponse> predictForProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(predictionService.predictForProduct(productId));
    }

    @GetMapping("/all") @Operation(summary = "Predict demand for all products")
    public ResponseEntity<List<PredictionResponse>> predictAll() {
        return ResponseEntity.ok(predictionService.predictAll());
    }
}
