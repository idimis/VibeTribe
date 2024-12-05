package com.vibetribe.backend.infrastructure.usecase.event.controller;

import com.vibetribe.backend.common.response.ApiResponse;
import com.vibetribe.backend.common.response.PaginatedResponse;
import com.vibetribe.backend.common.util.PaginationUtil;
import com.vibetribe.backend.entity.Event;
import com.vibetribe.backend.infrastructure.system.security.Claims;
import com.vibetribe.backend.infrastructure.usecase.event.dto.CreateEventRequestDTO;
import com.vibetribe.backend.infrastructure.usecase.event.dto.UpdateEventRequestDTO;
import com.vibetribe.backend.infrastructure.usecase.event.service.EventService;
import com.vibetribe.backend.infrastructure.usecase.review.dto.ReviewRequestDTO;
import com.vibetribe.backend.infrastructure.usecase.review.dto.ReviewResponseDTO;
import com.vibetribe.backend.infrastructure.usecase.review.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/events")
public class EventController {

    private final EventService eventService;
    private final ReviewService reviewService;

    public EventController(EventService eventService,
                           ReviewService reviewService) {
        this.eventService = eventService;
        this.reviewService = reviewService;
    }

    @PreAuthorize("hasRole('ORGANIZER')")
    @PostMapping("/create")
    public ResponseEntity<?> createEvent(@Valid @RequestBody CreateEventRequestDTO request) {
        Long organizerId = Claims.getUserIdFromJwt();
        Event event = eventService.createEvent(request, organizerId);
        return ApiResponse.successfulResponse("Create new event success", event);
    }

    @PreAuthorize("hasRole('ORGANIZER')")
    @GetMapping("/organizer")
    public ResponseEntity<?> getAllEventByOrganizer(@PageableDefault(size = 10) Pageable pageable) {
        Long organizerId = Claims.getUserIdFromJwt();
        Page<Event> events = eventService.getAllEventsByOrganizer(pageable, organizerId);

        if(events.isEmpty()) {
            return ApiResponse.failedResponse(HttpStatus.NOT_FOUND.value(), "Events not found");
        }

        PaginatedResponse<Event> paginatedEvents = PaginationUtil.toPaginatedResponse(events);
        return ApiResponse.successfulResponse("Get all events by organizer success", paginatedEvents);
    }

    @PreAuthorize("hasRole('ORGANIZER')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @RequestBody UpdateEventRequestDTO request) {
        Long organizerId = Claims.getUserIdFromJwt();
        Event event = eventService.updateEvent(id, request, organizerId);
        return ApiResponse.successfulResponse("Update event success", event);
    }

    @PreAuthorize("hasRole('ORGANIZER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        Long organizerId = Claims.getUserIdFromJwt();
        eventService.deleteEvent(id, organizerId);
        return ApiResponse.successfulResponse("Delete event success", null);
    }

    @GetMapping
    public ResponseEntity<?> getEvents(@RequestParam(required = false) String location,
                                       @RequestParam(required = false) String category,
                                       @RequestParam(required = false) String search,
                                       @PageableDefault(size = 10) Pageable pageable) {

        Page<Event> events = eventService.getUpcomingEvents(pageable,
                location != null ? location.toLowerCase() : null,
                category != null ? category.toLowerCase() : null,
                search != null ? search.toLowerCase() : null);

        if (events.isEmpty()) {
            return ApiResponse.failedResponse(HttpStatus.NOT_FOUND.value(), "Events not found");
        }

        PaginatedResponse<Event> paginatedAllEvents = PaginationUtil.toPaginatedResponse(events);
        return ApiResponse.successfulResponse("Get events success", paginatedAllEvents);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEvent(@PathVariable Long id) {
    return eventService.getEventById(id)
            .map(event -> ApiResponse.successfulResponse("Get event success", event))
            .orElse(ApiResponse.failedResponse(HttpStatus.NOT_FOUND.value(), "Event not found"));
}

    @GetMapping("/exclude-location")
    public ResponseEntity<?> getEventsExcludeLocation(@RequestParam String location,
                                                      @PageableDefault(size = 10) Pageable pageable) {
        Page<Event> events = eventService.getEventsExcludingLocation(pageable, location.toLowerCase());

        if(events.isEmpty()) {
            return ApiResponse.failedResponse(HttpStatus.NOT_FOUND.value(), "Events not found");
        }

        PaginatedResponse<Event> paginatedEvents = PaginationUtil.toPaginatedResponse(events);
        return ApiResponse.successfulResponse("Get events exclude location success", paginatedEvents);
    }

    @PreAuthorize("hasRole('CUSTOMER')")
    @PostMapping("/review")
    public ResponseEntity<?> submitReview(@Valid @RequestBody ReviewRequestDTO reviewRequest) {
        Long customerId = Claims.getUserIdFromJwt();
        ReviewResponseDTO reviewResponse = eventService.submitReview(customerId, reviewRequest);
        return ApiResponse.successfulResponse("Review submitted successfully", reviewResponse);
    }

    @GetMapping("/{eventId}/reviews")
    public ResponseEntity<?> getReviewsByEventId(@PathVariable Long eventId, @PageableDefault(size = 10) Pageable pageable) {
        var reviews = reviewService.getReviewsByEventId(eventId, pageable);

        if (reviews.isEmpty()) {
            return ApiResponse.failedResponse(HttpStatus.NOT_FOUND.value(), "Reviews not found");
        }

        PaginatedResponse<ReviewResponseDTO> paginatedReviews = PaginationUtil.toPaginatedResponse(reviews);
        return ApiResponse.successfulResponse("Get reviews success", paginatedReviews);
    }

    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/past")
    public ResponseEntity<?> getPastEventsByCustomer(@PageableDefault(size = 10) Pageable pageable) {
        Long customerId = Claims.getUserIdFromJwt();
        Page<Event> events = eventService.getPastEventsByCustomer(customerId, pageable);

        if (events.isEmpty()) {
            return ApiResponse.failedResponse(HttpStatus.NOT_FOUND.value(), "Past events not found");
        }

        PaginatedResponse<Event> paginatedEvents = PaginationUtil.toPaginatedResponse(events);
        return ApiResponse.successfulResponse("Get past events success", paginatedEvents);
    }
}
