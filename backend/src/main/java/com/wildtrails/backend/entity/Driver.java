package com.wildtrails.backend.entity;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "drivers")
public class Driver {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id", nullable = false, unique = true)
    private User user;
    private String licenseNumber;
    private String vehicleType;
    private String photoUrl;
    private Integer yearsExperience;
    private Boolean isAvailable;

}
