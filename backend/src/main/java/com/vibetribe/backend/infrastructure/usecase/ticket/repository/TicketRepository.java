package com.vibetribe.backend.infrastructure.usecase.ticket.repository;

import com.vibetribe.backend.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
