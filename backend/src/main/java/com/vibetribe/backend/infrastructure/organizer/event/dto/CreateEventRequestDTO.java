package com.vibetribe.backend.infrastructure.organizer.event.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateEventRequestDTO {
    @NotBlank(message = "Event name is mandatory")
    private String eventName;

    // Add other event fields as needed
}
