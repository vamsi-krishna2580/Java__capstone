package com.retail.inventory.repository;

import com.retail.inventory.entity.InventoryTransaction;
import com.retail.inventory.entity.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface InventoryTransactionRepository extends JpaRepository<InventoryTransaction, Long> {
    List<InventoryTransaction> findAllByOrderByTransactionDateDesc();

    List<InventoryTransaction> findByProductIdOrderByTransactionDateDesc(Long productId);

    @Query("SELECT it FROM InventoryTransaction it WHERE it.transactionDate BETWEEN :start AND :end")
    List<InventoryTransaction> findByDateRange(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
