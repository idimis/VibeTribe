package com.vibetribe.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "point", schema = "vibetribe")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Point {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "point_id_gen")
    @SequenceGenerator(name = "point_id_gen", sequenceName = "point_id_seq", schema = "vibetribe", allocationSize = 1)
    private Integer id;

    @NotNull
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "points")
    private Integer points;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @NotNull
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
