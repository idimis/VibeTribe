package com.vibetribe.backend.infrastructure.event.repository;

import com.vibetribe.backend.entity.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Optional<Event> findByIdAndOrganizerId(Long eventId, Long organizerId);
    Page<Event> findByLocationNot(Pageable pageable, String location);
    Page<Event> findByOrganizerId(Pageable pageable, Long organizerId);

    @Query("SELECT e FROM Event e WHERE (e.dateTimeStart > :#{#currentDateTime} OR (e.dateTimeStart = :#{#currentDateTime} AND e.dateTimeEnd >= :#{#currentDateTime})) " +
            "AND (:location IS NULL OR LOWER(e.location) LIKE %:location%) " +
            "AND (:category IS NULL OR LOWER(e.category) = :category) " +
            "AND (:search IS NULL OR LOWER(e.title) LIKE %:search%)")
    Page<Event> findUpcomingEvents(Pageable pageable, LocalDateTime currentDateTime, String location, String category, String search);
}
