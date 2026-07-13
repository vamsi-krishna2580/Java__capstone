package com.retail.prediction.service;

import com.retail.billing.entity.BillItem;
import com.retail.billing.repository.BillItemRepository;
import com.retail.exception.ResourceNotFoundException;
import com.retail.prediction.dto.PredictionResponse;
import com.retail.product.entity.Product;
import com.retail.product.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 3-month moving average demand forecasting:
 *   avgSales       = (month-1 + month-2 + month-3) / 3
 *   predictedDemand = avgSales * 1.20  (20% safety buffer)
 *   reorderQty     = max(0, predictedDemand - currentStock)
 */
@Service
public class PredictionService {
    private final ProductRepository productRepository;
    private final BillItemRepository billItemRepository;

    public PredictionService(ProductRepository productRepository, BillItemRepository billItemRepository) {
        this.productRepository = productRepository;
        this.billItemRepository = billItemRepository;
    }

    public PredictionResponse predictForProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + productId));

        BigDecimal avg = calculateAverageMonthlySales(productId);
        BigDecimal predicted = avg.multiply(BigDecimal.valueOf(1.20)).setScale(2, RoundingMode.HALF_UP);
        int reorderQty = Math.max(0, predicted.intValue() - product.getQuantity());

        return new PredictionResponse(product.getId(), product.getProductName(),
                product.getQuantity(), avg, predicted, reorderQty);
    }

    public List<PredictionResponse> predictAll() {
        return productRepository.findAll().stream()
                .map(p -> predictForProduct(p.getId()))
                .collect(Collectors.toList());
    }

    private BigDecimal calculateAverageMonthlySales(Long productId) {
        LocalDateTime now = LocalDateTime.now();
        long m1 = getSalesForMonth(productId, now.minusMonths(1));
        long m2 = getSalesForMonth(productId, now.minusMonths(2));
        long m3 = getSalesForMonth(productId, now.minusMonths(3));
        return BigDecimal.valueOf(m1 + m2 + m3)
                .divide(BigDecimal.valueOf(3), 2, RoundingMode.HALF_UP);
    }

    private long getSalesForMonth(Long productId, LocalDateTime monthRef) {
        LocalDateTime start = monthRef.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime end   = monthRef.withDayOfMonth(monthRef.toLocalDate().lengthOfMonth())
                                      .withHour(23).withMinute(59).withSecond(59);
        return billItemRepository.findByBillDateRange(start, end).stream()
                .filter(bi -> bi.getProduct().getId().equals(productId))
                .mapToLong(BillItem::getQuantity)
                .sum();
    }
}
