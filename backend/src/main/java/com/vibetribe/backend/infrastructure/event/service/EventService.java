package com.vibetribe.backend.infrastructure.event.service;

import com.vibetribe.backend.entity.Event;
import com.vibetribe.backend.entity.User;
import com.vibetribe.backend.infrastructure.event.dto.CreateEventRequestDTO;
import com.vibetribe.backend.infrastructure.event.dto.UpdateEventRequestDTO;
import com.vibetribe.backend.infrastructure.event.repository.EventRepository;
import com.vibetribe.backend.infrastructure.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public EventService(EventRepository eventRepository, UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    public Event createEvent(CreateEventRequestDTO request, Long organizerId) {
        User organizer = userRepository.findById(organizerId)
                .orElseThrow(() -> new RuntimeException("Organizer not found"));

        Event event = new Event();
        event.setImageUrl(request.getImageUrl());
        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setDate(request.getDate());
        event.setTimeStart(request.getTimeStart());
        event.setTimeEnd(request.getTimeEnd());
        event.setLocation(request.getLocation());
        event.setLocationDetails(request.getLocationDetails());
        event.setCategory(request.getCategory());
        event.setFee(request.getFee());
        event.setAvailableSeats(request.getAvailableSeats());
        event.setOrganizer(organizer);

        return eventRepository.save(event);
    }

    public Event updateEvent(Long eventId, UpdateEventRequestDTO request, Long organizerId) {
        Event event = eventRepository.findByIdAndOrganizerId(eventId, organizerId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found or not owned by organizer"));

        if (request.getImageUrl() != null) {
            event.setImageUrl(request.getImageUrl());
        }
        if (request.getTitle() != null) {
            event.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            event.setDescription(request.getDescription());
        }
        if (request.getDate() != null) {
            event.setDate(request.getDate());
        }
        if (request.getTimeStart() != null) {
            event.setTimeStart(request.getTimeStart());
        }
        if (request.getTimeEnd() != null) {
            event.setTimeEnd(request.getTimeEnd());
        }
        if (request.getLocation() != null) {
            event.setLocation(request.getLocation());
        }
        if (request.getLocationDetails() != null) {
            event.setLocationDetails(request.getLocationDetails());
        }
        if (request.getCategory() != null) {
            event.setCategory(request.getCategory());
        }
        if (request.getFee() != null) {
            event.setFee(request.getFee());
        }
        if (request.getAvailableSeats() != null) {
            event.setAvailableSeats(request.getAvailableSeats());
        }

        return eventRepository.save(event);
    }

    public void deleteEvent(Long eventId, Long organizerId) {
        Event event = eventRepository.findByIdAndOrganizerId(eventId, organizerId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found or not owned by organizer"));
        eventRepository.delete(event);
    }

    public Page<Event> getAllEventsByOrganizer(Pageable pageable, Long organizerId) {
        return eventRepository.findByOrganizerId(pageable, organizerId);
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public Page<Event> getEventsExcludingLocation(Pageable pageable, String location) {
        return eventRepository.findByLocationNot(pageable, location);
    }

    public Page<Event> getUpcomingEvents(Pageable pageable, String location, String category, String search) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        return eventRepository.findUpcomingEvents(pageable, currentDateTime, location, category, search);
    }
}
