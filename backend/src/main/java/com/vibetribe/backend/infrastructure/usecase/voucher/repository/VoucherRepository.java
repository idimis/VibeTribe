package com.vibetribe.backend.infrastructure.usecase.voucher.repository;

import com.vibetribe.backend.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoucherRepository extends JpaRepository<Voucher, Long> {
}
