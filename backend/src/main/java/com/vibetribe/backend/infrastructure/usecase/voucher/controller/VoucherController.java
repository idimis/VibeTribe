package com.vibetribe.backend.infrastructure.usecase.voucher.controller;

import com.vibetribe.backend.common.response.ApiResponse;
import com.vibetribe.backend.entity.Voucher;
import com.vibetribe.backend.infrastructure.system.security.Claims;
import com.vibetribe.backend.infrastructure.usecase.voucher.dto.CreateVoucherRequestDTO;
import com.vibetribe.backend.infrastructure.usecase.voucher.service.VoucherService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/vouchers")
public class VoucherController {
    private final VoucherService voucherService;

    public VoucherController(VoucherService voucherService) {
        this.voucherService = voucherService;
    }

    @PreAuthorize("hasRole('ORGANIZER')")
    @PostMapping("/create")
    public ResponseEntity<?> createVoucher(@Valid @RequestBody CreateVoucherRequestDTO request) {
        Long organizerId = Claims.getUserIdFromJwt();
        Voucher voucher = voucherService.createEventVoucher(request, organizerId);
        return ApiResponse.successfulResponse("Create new voucher success", voucher);
    }
}