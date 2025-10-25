package com.wildtrails.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "packages")
public class Package {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long packageID;

    // Common fields
    @Column(nullable = false)
    private String packageName;

    @Column(nullable = false)
    private Double packagePrice;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PackageType packageType;

    @Column(length = 500)
    private String imageUrl;

    // --- Safari-specific fields ---
    private Integer maxPeople;
    private String time;
    private String duration;

    // --- Activity-specific fields ---
    @Column(length = 1000)
    private String details;
    private String difficulty;
    private String location;

    // --- Hire-specific fields ---
    private String vehicleType;
    private String tourName;
    private Integer capacity;

    public enum PackageType {
        SAFARI,
        HIRE,
        ACTIVITY
    }
}
