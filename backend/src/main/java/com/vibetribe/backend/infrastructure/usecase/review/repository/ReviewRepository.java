package com.vibetribe.backend.infrastructure.usecase.review.repository;

import com.vibetribe.backend.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findByEventId(Long eventId, Pageable pageable);
}
