package com.vibetribe.backend.infrastructure.voucher.service;

import com.vibetribe.backend.entity.DateRangeBasedVoucher;
import com.vibetribe.backend.entity.Event;
import com.vibetribe.backend.entity.QuantityBasedVoucher;
import com.vibetribe.backend.entity.Voucher;
import com.vibetribe.backend.infrastructure.event.repository.EventRepository;
import com.vibetribe.backend.infrastructure.voucher.dto.CreateVoucherRequestDTO;
import com.vibetribe.backend.infrastructure.voucher.repository.VoucherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VoucherService {
    private final VoucherRepository voucherRepository;
    private final EventRepository eventRepository;

    @Autowired
    public VoucherService(VoucherRepository voucherRepository, EventRepository eventRepository) {
        this.voucherRepository = voucherRepository;
        this.eventRepository = eventRepository;
    }

    public Voucher createVoucher(CreateVoucherRequestDTO request, Long organizerId) {
        Event event = eventRepository.findByIdAndOrganizerId(request.getEventId(), organizerId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found or not owned by organizer"));

        Voucher voucher = new Voucher();
        voucher.setEvent(event);
        voucher.setVoucherCode(request.getVoucherCode());
        voucher.setVoucherValue(request.getVoucherValue());
        voucher.setDescription(request.getDescription());
        voucher.setVoucherType(request.getVoucherType());

        voucher = voucherRepository.save(voucher);

        if ("dateRange".equalsIgnoreCase(request.getVoucherType())) {
            DateRangeBasedVoucher dateRangeBasedVoucher = new DateRangeBasedVoucher();
            dateRangeBasedVoucher.setVoucher(voucher);
            dateRangeBasedVoucher.setStartDate(request.getStartDate());
            dateRangeBasedVoucher.setEndDate(request.getEndDate());
            // Save dateRangeBasedVoucher to its repository
        }

        if ("quantity".equalsIgnoreCase(request.getVoucherType())) {
            QuantityBasedVoucher quantityBasedVoucher = new QuantityBasedVoucher();
            quantityBasedVoucher.setVoucher(voucher);
            quantityBasedVoucher.setQuantityLimit(request.getQuantityLimit());
            // Save quantityBasedVoucher to its repository
        }

        return voucher;
    }
}