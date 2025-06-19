package com.wildtrails.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "customers")
public class Customer {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id", nullable = false, unique = true)
    private User user;

    private String photo_url;
    private String phone_number;
    private String address;
    private Integer loyalty_points;
    
}
