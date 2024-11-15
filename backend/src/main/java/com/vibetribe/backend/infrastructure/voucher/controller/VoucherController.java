package com.vibetribe.backend.infrastructure.voucher.controller;

import com.vibetribe.backend.common.response.ApiResponse;
import com.vibetribe.backend.entity.Voucher;
import com.vibetribe.backend.infrastructure.security.Claims;
import com.vibetribe.backend.infrastructure.voucher.dto.CreateVoucherRequestDTO;
import com.vibetribe.backend.infrastructure.voucher.service.VoucherService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/vouchers")
public class VoucherController {
    private final VoucherService voucherService;

    @Autowired
    public VoucherController(VoucherService voucherService) {
        this.voucherService = voucherService;
    }

    @PreAuthorize("hasRole('organizer')")
    @PostMapping("/create")
    public ResponseEntity<?> createVoucher(@Valid @RequestBody CreateVoucherRequestDTO request) {
        Long organizerId = Claims.getUserIdFromJwt();
        Voucher voucher = voucherService.createEventVoucher(request, organizerId);
        return ApiResponse.successfulResponse("Create new voucher success", voucher);
    }
}