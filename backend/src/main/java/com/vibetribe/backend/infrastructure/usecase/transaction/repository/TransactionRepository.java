package com.vibetribe.backend.infrastructure.usecase.transaction.repository;

import com.vibetribe.backend.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
