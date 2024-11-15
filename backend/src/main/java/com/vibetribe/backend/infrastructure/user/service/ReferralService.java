package com.vibetribe.backend.infrastructure.user.service;

import com.vibetribe.backend.entity.User;
import com.vibetribe.backend.infrastructure.user.repository.UserRepository;
import com.vibetribe.backend.infrastructure.voucher.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReferralService {
    private final UserRepository userRepository;
    private final VoucherService voucherService;
    private final PointService pointService;

    @Autowired
    public ReferralService(UserRepository userRepository, VoucherService voucherService, PointService pointService) {
        this.userRepository = userRepository;
        this.voucherService = voucherService;
        this.pointService = pointService;
    }

    public void handleReferral(String referralCode, User referredUser) {
        User referrer = userRepository.findByReferralCode(referralCode)
                .orElseThrow(() -> new IllegalArgumentException("Invalid referral code"));

        // Generate a 10% discount voucher for the referred user with a 3-month expiration
        voucherService.createIndividualVoucher(referredUser, 10);

        // Add 10000 points to the referrer with a 3-month expiration
        pointService.addPointsToReferrer(referrer, 10000);
    }
}
