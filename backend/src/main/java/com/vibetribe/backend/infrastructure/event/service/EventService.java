package com.vibetribe.backend.infrastructure.event.service;

import com.vibetribe.backend.entity.Event;
import com.vibetribe.backend.entity.User;
import com.vibetribe.backend.infrastructure.event.dto.CreateEventRequestDTO;
import com.vibetribe.backend.infrastructure.event.repository.EventRepository;
import com.vibetribe.backend.infrastructure.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    @Autowired
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

    public List<Event> getEventsByLocation(String location) {
        return eventRepository.findByLocation(location);
    }

    public Page<Event> getAllEvents(Pageable pageable) {
        return eventRepository.findAll(pageable);
    }
}
