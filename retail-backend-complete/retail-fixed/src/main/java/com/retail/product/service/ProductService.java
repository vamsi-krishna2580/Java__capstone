package com.retail.product.service;

import com.retail.exception.ResourceNotFoundException;
import com.retail.product.dto.*;
import com.retail.product.entity.Product;
import com.retail.product.repository.ProductRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    public ProductService(ProductRepository productRepository) { this.productRepository = productRepository; }

    public ProductResponse create(ProductRequest request) {
        return new ProductResponse(productRepository.save(mapToEntity(new Product(), request)));
    }

    public Page<ProductResponse> getAll(String search, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        if (search != null && !search.isEmpty())
            return productRepository.findByProductNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(
                    search, search, pageable).map(ProductResponse::new);
        return productRepository.findAll(pageable).map(ProductResponse::new);
    }

    public ProductResponse getById(Long id) { return new ProductResponse(findOrThrow(id)); }

    public ProductResponse update(Long id, ProductRequest request) {
        return new ProductResponse(productRepository.save(mapToEntity(findOrThrow(id), request)));
    }

    public void delete(Long id) { findOrThrow(id); productRepository.deleteById(id); }

    public List<ProductResponse> getLowStock() {
        return productRepository.findLowStockProducts().stream().map(ProductResponse::new).collect(Collectors.toList());
    }

    public Product findEntityById(Long id) { return findOrThrow(id); }
    public Product save(Product product) { return productRepository.save(product); }

    private Product findOrThrow(Long id) {
        return productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    private Product mapToEntity(Product p, ProductRequest r) {
        p.setProductName(r.getProductName()); p.setCategory(r.getCategory());
        p.setBrand(r.getBrand()); p.setDescription(r.getDescription());
        p.setPrice(r.getPrice()); p.setQuantity(r.getQuantity());
        p.setReorderLevel(r.getReorderLevel()); p.setSupplier(r.getSupplier());
        if (r.getProductCode() != null) p.setProductCode(r.getProductCode());
        return p;
    }
}
