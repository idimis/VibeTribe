package com.vibetribe.backend.infrastructure.organizer.event.controller;

import com.vibetribe.backend.common.response.ApiResponse;
import com.vibetribe.backend.infrastructure.organizer.event.dto.CreateEventRequestDTO;
import com.vibetribe.backend.infrastructure.organizer.event.service.EventService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/organizer/events")
public class EventController {
    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PreAuthorize("hasRole('organizer')")
    @PostMapping
    public ResponseEntity<?> createEvent(@Valid @RequestBody CreateEventRequestDTO createEventRequestDTO) {
        String result = eventService.createEvent(createEventRequestDTO);
        return ApiResponse.successfulResponse(result);
    }
}