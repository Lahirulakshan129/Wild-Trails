//Sample Booking Entity use for review creation

package com.wildtrails.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "bookings")
@Getter
@Setter
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

//    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
//    private Review review;

    @Temporal(TemporalType.DATE) // Specify only date (no time)
    private Date date;
}
