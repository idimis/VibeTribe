package com.vibetribe.backend.infrastructure.usecase.transaction.repository;

import com.vibetribe.backend.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Optional<Transaction> findTopByCustomerIdOrderByCreatedAtDesc(Long customerId);
}
