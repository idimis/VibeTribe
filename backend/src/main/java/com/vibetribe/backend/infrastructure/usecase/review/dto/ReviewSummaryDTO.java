package com.vibetribe.backend.infrastructure.usecase.review.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewSummaryDTO {
    private String eventName;
    private String customerName;
    private Integer rating;
    private String review;

    public ReviewSummaryDTO(String title, String name, Integer rating, String review) {
        this.eventName = title;
        this.customerName = name;
        this.rating = rating;
        this.review = review;
    }
}
