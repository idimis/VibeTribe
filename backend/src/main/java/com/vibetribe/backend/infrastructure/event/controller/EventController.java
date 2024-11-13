package com.vibetribe.backend.infrastructure.event.controller;

import com.vibetribe.backend.common.response.ApiResponse;
import com.vibetribe.backend.common.response.PaginatedResponse;
import com.vibetribe.backend.common.util.PaginationUtil;
import com.vibetribe.backend.entity.Event;
import com.vibetribe.backend.infrastructure.event.dto.CreateEventRequestDTO;
import com.vibetribe.backend.infrastructure.event.service.EventService;
import com.vibetribe.backend.infrastructure.security.Claims;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/events")
public class EventController {
    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PreAuthorize("hasRole('organizer')")
    @PostMapping("/create")
    public ResponseEntity<?> createEvent(@Valid @RequestBody CreateEventRequestDTO request) {
        Long organizerId = Claims.getUserIdFromJwt();
        Event event = eventService.createEvent(request, organizerId);
        return ApiResponse.successfulResponse("Create new event success", event);
    }

    @GetMapping
    public ResponseEntity<?> getEvents(@RequestParam(required = false) String location, @PageableDefault(size = 10) Pageable pageable) {
        Page<Event> events;

        if (location != null) {
            events = eventService.getEventsByLocation(pageable, location);

            if (events.isEmpty()) {
                return ApiResponse.failedResponse("No events found in this location");
            }

            PaginatedResponse<Event> paginatedEventsByLocation = PaginationUtil.toPaginatedResponse(events);
            return ApiResponse.successfulResponse("Get events by location success", paginatedEventsByLocation);
        }

        events = eventService.getAllEvents(pageable);
        PaginatedResponse<Event> paginatedAllEvents = PaginationUtil.toPaginatedResponse(events);
        return ApiResponse.successfulResponse("Get all events success", paginatedAllEvents);
    }
}
