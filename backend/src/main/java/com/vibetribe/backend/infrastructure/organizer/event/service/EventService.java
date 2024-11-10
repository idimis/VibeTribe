package com.vibetribe.backend.infrastructure.organizer.event.service;

import com.vibetribe.backend.infrastructure.organizer.event.dto.CreateEventRequestDTO;
import org.springframework.stereotype.Service;

@Service
public class EventService {
    public String createEvent(CreateEventRequestDTO createEventRequestDTO) {
        return createEventRequestDTO.getEventName();
    }
}
