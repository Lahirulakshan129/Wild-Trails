package com.wildtrails.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.wildtrails.backend.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
