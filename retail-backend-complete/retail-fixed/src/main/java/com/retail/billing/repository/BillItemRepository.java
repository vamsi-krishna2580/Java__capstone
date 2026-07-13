package com.retail.billing.repository;

import com.retail.billing.entity.BillItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BillItemRepository extends JpaRepository<BillItem, Long> {

    @Query("SELECT bi FROM BillItem bi WHERE bi.bill.billDate BETWEEN :start AND :end")
    List<BillItem> findByBillDateRange(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT bi.product.id, bi.product.productName, SUM(bi.quantity), SUM(bi.subtotal) " +
           "FROM BillItem bi GROUP BY bi.product.id, bi.product.productName ORDER BY SUM(bi.quantity) DESC")
    List<Object[]> findTopSellingProducts();
}
