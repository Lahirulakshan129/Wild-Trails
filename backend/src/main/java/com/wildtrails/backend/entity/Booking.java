//Sample Booking Entity use for review creation

package com.wildtrails.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String status; // "finished", "upcoming", "progressing", etc.

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "driver_id")
    private Driver driver;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Review review;

    private boolean reviewed = false;

    @Temporal(TemporalType.DATE) // Specify only date (no time)
    private Date date;

    private String guestUserName;
    private String guestUserEmail;
    private String guestUserPhone;

    private Integer numAdults;
    private Date safariDate;
    private String pickupLocation;
    private Double totalAmount;
    private String paymentStatus;
    private LocalDateTime bookingDate;
    private LocalDateTime updatedAt;
    private String driverStatus; // "assigned", "not assigned", etc.

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "packageId")
    private Package Package;
}
