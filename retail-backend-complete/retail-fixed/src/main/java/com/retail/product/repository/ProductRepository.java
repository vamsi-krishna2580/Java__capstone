package com.retail.product.repository;

import com.retail.product.entity.Product;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByProductNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(
            String name, String category, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.reorderLevel IS NOT NULL AND p.quantity <= p.reorderLevel")
    List<Product> findLowStockProducts();

    boolean existsByProductCode(String productCode);
}
