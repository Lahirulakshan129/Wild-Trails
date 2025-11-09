package com.wildtrails.backend.controller;

import com.wildtrails.backend.dto.DriverDTO;
import com.wildtrails.backend.dto.RegisterRequest;
import com.wildtrails.backend.dto.UpcomingBookingDTO;
import com.wildtrails.backend.entity.Booking;
import com.wildtrails.backend.entity.Driver;
import com.wildtrails.backend.repository.BookingRepository;
import com.wildtrails.backend.repository.DriverRepository;
import com.wildtrails.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AuthService authService;
    private final DriverRepository driverRepository;
    private final BookingRepository bookingRepository;

    // Only users with role ADMIN can access this
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/register-driver")
    public ResponseEntity<?> registerDriver(@RequestBody RegisterRequest request) {

        try {
            authService.registerDriver(request);
            return ResponseEntity.ok("Driver registered successfully.");
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Something went wrong: " );
        }
    }

    @GetMapping("/getAvailableDrivers")
    public ResponseEntity<List<DriverDTO>> getAvailableDrivers(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime bookingDate) {

        List<Driver> drivers = driverRepository.findAvailableDriversByBookingDate(bookingDate);

        List<DriverDTO> driverDTOs = drivers.stream().map(driver -> {
            DriverDTO dto = new DriverDTO();
            dto.setId(driver.getId());
            dto.setName(driver.getUser().getName());
            dto.setIsAvailable(driver.is_available());
            dto.setVehicle_type(driver.getVehicle_type());
            dto.setPhoto_url(driver.getPhoto_url());
            return dto;
        }).toList();
        return ResponseEntity.ok(driverDTOs);
    }

    @PostMapping("/getAllUpcomingBooking")
    public ResponseEntity<List<UpcomingBookingDTO>> getAllUpcomingBookings(@RequestBody Map<String, String> request) {
        String todayStr = request.get("today");
        OffsetDateTime offsetDateTime = OffsetDateTime.parse(todayStr);
        LocalDateTime today = offsetDateTime.toLocalDateTime();

        List<Booking> bookings = bookingRepository.findByBookingDateAfter(today);

        List<UpcomingBookingDTO> upcomingBookings = bookings.stream().map(booking -> {
            UpcomingBookingDTO dto = new UpcomingBookingDTO();

            dto.setId(booking.getId());
            dto.setBookingDate(booking.getBookingDate() != null ? booking.getBookingDate().toLocalDate().toString() : null);
            dto.setBookingTime(booking.getBookingDate() != null ? booking.getBookingDate().toLocalTime().toString() : null);
            dto.setStatus(booking.getStatus());

            dto.setCustomerName(
                    booking.getCustomer() != null && booking.getCustomer().getUser() != null
                            ? booking.getCustomer().getUser().getName()
                            : ""
            );

            dto.setDriverName(
                    booking.getDriver() != null && booking.getDriver().getUser() != null
                            ? booking.getDriver().getUser().getName()
                            : ""
            );
            dto.setGuestUserName(booking.getGuestUserName());
            dto.setGuestUserEmail(booking.getGuestUserEmail());
            dto.setGuestUserPhone(booking.getGuestUserPhone());
            dto.setNumAdults(booking.getNumAdults());
            dto.setSafariDate(booking.getSafariDate());
            dto.setPickupLocation(booking.getPickupLocation());
            dto.setTotalAmount(booking.getTotalAmount());
            dto.setPaymentStatus(booking.getPaymentStatus());
            dto.setUpdatedAt(booking.getUpdatedAt());
            dto.setDriverStatus(booking.getDriverStatus());
            dto.setPackageName(booking.getPackage() != null ? booking.getPackage().getPackageName() : null);
            return dto;
        }).toList();
        return ResponseEntity.ok(upcomingBookings);
    }
}
