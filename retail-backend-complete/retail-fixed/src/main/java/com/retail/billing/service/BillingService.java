package com.retail.billing.service;

import com.retail.billing.dto.*;
import com.retail.billing.entity.*;
import com.retail.billing.repository.BillRepository;
import com.retail.customer.entity.Customer;
import com.retail.customer.repository.CustomerRepository;
import com.retail.exception.ResourceNotFoundException;
import com.retail.inventory.service.InventoryService;
import com.retail.product.entity.Product;
import com.retail.product.service.ProductService;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
public class BillingService {
    private final BillRepository billRepository;
    private final CustomerRepository customerRepository;
    private final ProductService productService;
    private final InventoryService inventoryService;

    public BillingService(BillRepository billRepository, CustomerRepository customerRepository,
                          ProductService productService, InventoryService inventoryService) {
        this.billRepository = billRepository; this.customerRepository = customerRepository;
        this.productService = productService; this.inventoryService = inventoryService;
    }

    @Transactional
    public BillResponse createBill(BillRequest request) {
        Customer customer = customerRepository.findById(request.getCustomerId())
            .orElseThrow(() -> new ResourceNotFoundException("Customer not found: " + request.getCustomerId()));

        Bill bill = new Bill();
        bill.setCustomer(customer);
        bill.setTax(request.getTax());
        bill.setDiscount(request.getDiscount());

        List<BillItem> billItems = new ArrayList<>();
        BigDecimal subtotal = BigDecimal.ZERO;

        for (BillItemRequest itemReq : request.getItems()) {
            Product product = productService.findEntityById(itemReq.getProductId());
            inventoryService.deductStock(product, itemReq.getQuantity());

            BillItem billItem = new BillItem();
            billItem.setBill(bill);
            billItem.setProduct(product);
            billItem.setQuantity(itemReq.getQuantity());
            billItem.setPrice(product.getPrice());
            BigDecimal itemSubtotal = product.getPrice().multiply(BigDecimal.valueOf(itemReq.getQuantity()));
            billItem.setSubtotal(itemSubtotal);
            subtotal = subtotal.add(itemSubtotal);
            billItems.add(billItem);
        }

        bill.setSubtotal(subtotal);

        BigDecimal taxAmount = subtotal.multiply(request.getTax())
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
        BigDecimal discountAmount = subtotal.multiply(request.getDiscount())
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
        bill.setTotalAmount(subtotal.add(taxAmount).subtract(discountAmount));
        bill.setItems(billItems);

        // Award loyalty points: 1 point per 100 rupees spent
        int points = bill.getTotalAmount().intValue() / 100;
        customer.setLoyaltyPoints(customer.getLoyaltyPoints() + points);
        customerRepository.save(customer);

        return new BillResponse(billRepository.save(bill));
    }

    public BillResponse getById(Long id) {
        return new BillResponse(billRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Bill not found: " + id)));
    }

    public Page<BillResponse> getHistory(Long customerId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("billDate").descending());
        if (customerId != null)
            return billRepository.findByCustomerIdOrderByBillDateDesc(customerId, pageable).map(BillResponse::new);
        return billRepository.findAllByOrderByBillDateDesc(pageable).map(BillResponse::new);
    }
}
