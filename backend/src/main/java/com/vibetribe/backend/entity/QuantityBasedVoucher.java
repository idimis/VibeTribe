package com.vibetribe.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "quantity_based_voucher", schema = "vibetribe")
@Getter
@Setter
@NoArgsConstructor
public class QuantityBasedVoucher {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "quantity_based_voucher_id_gen")
    @SequenceGenerator(name = "quantity_based_voucher_id_gen", sequenceName = "quantity_based_voucher_id_seq", schema = "vibetribe", allocationSize = 1)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "voucher_id", nullable = false)
    private Voucher voucher;

    @Column(name = "quantity_limit", nullable = false)
    private Integer quantityLimit;
}
