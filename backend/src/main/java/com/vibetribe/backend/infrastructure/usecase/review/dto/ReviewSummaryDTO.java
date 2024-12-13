package com.vibetribe.backend.infrastructure.usecase.review.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewSummaryDTO {
    private String eventName;
    private Long customerId;
    private String photoProfileUrl;
    private String customerName;
    private Integer rating;
    private String review;

    public ReviewSummaryDTO(String title, Long customerId, String photoProfileUrl, String name, Integer rating, String review) {
        this.eventName = title;
        this.customerId = customerId;
        this.photoProfileUrl = photoProfileUrl;
        this.customerName = name;
        this.rating = rating;
        this.review = review;
    }
}
