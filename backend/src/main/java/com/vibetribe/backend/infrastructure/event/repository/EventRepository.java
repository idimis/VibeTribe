package com.vibetribe.backend.infrastructure.event.repository;

import com.vibetribe.backend.entity.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Page<Event> findAll(Pageable pageable);
    Optional<Event> findByIdAndOrganizerId(Long eventId, Long organizerId);
    Page<Event> findByLocation(Pageable pageable, String location);
    Page<Event> findByCategory(Pageable pageable, String category);
    Page<Event> findByLocationAndCategory(Pageable pageable, String location, String category);
}
