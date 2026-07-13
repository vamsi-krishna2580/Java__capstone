package com.retail.inventory.service;

import com.retail.exception.InsufficientStockException;
import com.retail.exception.ResourceNotFoundException;
import com.retail.inventory.dto.*;
import com.retail.inventory.entity.*;
import com.retail.inventory.repository.InventoryTransactionRepository;
import com.retail.product.dto.ProductResponse;
import com.retail.product.entity.Product;
import com.retail.product.repository.ProductRepository;
import com.retail.product.service.ProductService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryService {
    private final InventoryTransactionRepository transactionRepository;
    private final ProductRepository productRepository;
    private final ProductService productService;

    public InventoryService(InventoryTransactionRepository transactionRepository,
                            ProductRepository productRepository,
                            ProductService productService) {
        this.transactionRepository = transactionRepository;
        this.productRepository = productRepository;
        this.productService = productService;
    }

    @Transactional
    public InventoryTransactionResponse stockIn(StockRequest request) {
        Product product = findProduct(request.getProductId());
        product.setQuantity(product.getQuantity() + request.getQuantity());
        productRepository.save(product);
        return new InventoryTransactionResponse(saveTransaction(product, request, TransactionType.STOCK_IN));
    }

    @Transactional
    public InventoryTransactionResponse stockOut(StockRequest request) {
        Product product = findProduct(request.getProductId());
        if (product.getQuantity() < request.getQuantity())
            throw new InsufficientStockException("Insufficient stock for: " + product.getProductName()
                    + ". Available: " + product.getQuantity());
        product.setQuantity(product.getQuantity() - request.getQuantity());
        productRepository.save(product);
        return new InventoryTransactionResponse(saveTransaction(product, request, TransactionType.STOCK_OUT));
    }

    public List<InventoryTransactionResponse> getHistory() {
        return transactionRepository.findAllByOrderByTransactionDateDesc()
                .stream().map(InventoryTransactionResponse::new).collect(Collectors.toList());
    }

    public List<ProductResponse> getLowStockProducts() { return productService.getLowStock(); }

    /** Called by BillingService — deducts stock and records transaction atomically. */
    @Transactional
    public void deductStock(Product product, int quantity) {
        if (product.getQuantity() < quantity)
            throw new InsufficientStockException("Insufficient stock for: " + product.getProductName());
        product.setQuantity(product.getQuantity() - quantity);
        productRepository.save(product);
        InventoryTransaction tx = new InventoryTransaction();
        tx.setProduct(product); tx.setQuantity(quantity);
        tx.setTransactionType(TransactionType.STOCK_OUT);
        tx.setReason("Sale - auto deduction");
        transactionRepository.save(tx);
    }

    private Product findProduct(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));
    }

    private InventoryTransaction saveTransaction(Product product, StockRequest request, TransactionType type) {
        InventoryTransaction tx = new InventoryTransaction();
        tx.setProduct(product); tx.setQuantity(request.getQuantity());
        tx.setTransactionType(type); tx.setReason(request.getReason());
        return transactionRepository.save(tx);
    }
}
