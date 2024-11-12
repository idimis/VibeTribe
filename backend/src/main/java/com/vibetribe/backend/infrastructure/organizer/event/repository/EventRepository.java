package com.vibetribe.backend.infrastructure.organizer.event.repository;

import com.vibetribe.backend.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
}
