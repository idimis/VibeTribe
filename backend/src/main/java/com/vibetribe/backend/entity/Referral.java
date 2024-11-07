package com.vibetribe.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "referral", schema = "vibetribe")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Referral {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "referral_id_gen")
    @SequenceGenerator(name = "referral_id_gen", sequenceName = "referral_id_seq", schema = "vibetribe", allocationSize = 1)
    private Integer id;

    @Column(name = "referral_code")
    private String referralCode;

    @Column(name = "referrer_id")
    private Integer referrerId;

    @Column(name = "referred_id")
    private Integer referredId;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}

