package com.retail.billing.repository;

import com.retail.billing.entity.Bill;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {

    Page<Bill> findByCustomerIdOrderByBillDateDesc(Long customerId, Pageable pageable);
    Page<Bill> findAllByOrderByBillDateDesc(Pageable pageable);
    List<Bill> findByBillDateBetween(LocalDateTime start, LocalDateTime end);

    @Query("SELECT COALESCE(SUM(b.totalAmount), 0) FROM Bill b WHERE b.billDate BETWEEN :start AND :end")
    BigDecimal sumRevenueByDateRange(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(DISTINCT b.customer.id) FROM Bill b WHERE b.billDate >= :since")
    long countDistinctCustomersByBillDateAfter(@Param("since") LocalDateTime since);
}
