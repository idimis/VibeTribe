package com.vibetribe.backend.infrastructure.usecase.transaction.service;

import com.vibetribe.backend.entity.*;
import com.vibetribe.backend.infrastructure.usecase.event.repository.EventRepository;
import com.vibetribe.backend.infrastructure.usecase.ticket.dto.TicketDTO;
import com.vibetribe.backend.infrastructure.usecase.ticket.service.TicketService;
import com.vibetribe.backend.infrastructure.usecase.transaction.dto.TransactionRequestDTO;
import com.vibetribe.backend.infrastructure.usecase.transaction.dto.TransactionResponseDTO;
import com.vibetribe.backend.infrastructure.usecase.transaction.repository.TransactionRepository;
import com.vibetribe.backend.infrastructure.usecase.user.repository.UserRepository;
import com.vibetribe.backend.infrastructure.usecase.voucher.repository.VoucherRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final EventRepository eventRepository;
    private final VoucherRepository voucherRepository;
    private final UserRepository userRepository;
    private final TicketService ticketService;

    public TransactionService(TransactionRepository transactionRepository,
                              EventRepository eventRepository,
                              VoucherRepository voucherRepository,
                              TicketService ticketService,
                              UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.eventRepository = eventRepository;
        this.voucherRepository = voucherRepository;
        this.userRepository = userRepository;
        this.ticketService = ticketService;
    }

    @Transactional
    public TransactionResponseDTO createTransaction(TransactionRequestDTO request, Long customerId) {
        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        if (event.getBookedSeats() + request.getQuantity() > event.getAvailableSeats()) {
            throw new IllegalStateException("No seats with this quantity is available for this event");
        }

        Voucher voucher = request.getVoucherId() != null ? voucherRepository.findById(request.getVoucherId()).orElse(null) : null;

        User customer = userRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        BigDecimal totalAmount = event.getFee().multiply(BigDecimal.valueOf(request.getQuantity()));
        BigDecimal discount = request.getPoints() != null ? request.getPoints() : BigDecimal.ZERO;
        BigDecimal voucherDiscount = voucher != null ? voucher.getVoucherValue() : BigDecimal.ONE;

        BigDecimal amountPaid = (totalAmount.subtract(discount)).multiply(voucherDiscount);

        Transaction transaction = new Transaction();
        transaction.setCustomer(customer);
        transaction.setEvent(event);
        transaction.setQuantity(request.getQuantity());
        transaction.setPointsApplied(discount);
        transaction.setDiscountApplied(voucherDiscount);
        transaction.setAmountPaid(amountPaid);
        transaction.setVoucher(voucher);

        transaction = transactionRepository.save(transaction);

        List<TicketDTO> tickets = ticketService.generateTickets(transaction);
        // Save tickets if necessary

        // Update booked seats
        event.setBookedSeats(event.getBookedSeats() + request.getQuantity());
        eventRepository.save(event);

        TransactionResponseDTO response = new TransactionResponseDTO();
        response.setId(transaction.getId());
        response.setCustomerId(customer.getId());
        response.setEventId(event.getId());
        response.setQuantity(transaction.getQuantity());
        response.setPointsApplied(transaction.getPointsApplied());
        response.setDiscountApplied(transaction.getDiscountApplied());
        response.setAmountPaid(transaction.getAmountPaid());

        return response;
    }
}
