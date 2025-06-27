package com.wildtrails.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import com.wildtrails.backend.service.AnimalSightingService;
import com.wildtrails.backend.dto.AnimalSightingDTO;
import com.wildtrails.backend.entity.AnimalSighting;
import com.wildtrails.backend.entity.Driver;
import com.wildtrails.backend.repository.DriverRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@PreAuthorize("hasRole('DRIVER')")
@RequestMapping("/api/sightings")
public class AnimalSightingController {

    private static final Logger logger = LoggerFactory.getLogger(AnimalSightingController.class);
    private final AnimalSightingService service;
    private final DriverRepository driverRepository;

    public AnimalSightingController(AnimalSightingService service, DriverRepository driverRepository) {
        this.service = service;
        this.driverRepository = driverRepository;
    }

    @PostMapping
    public ResponseEntity<AnimalSighting> createSighting(@RequestBody AnimalSightingDTO dto,
            Authentication authentication) {
                System.out.println("Received request to create sighting: " + dto);
        String email = authentication.getName();
        try {
            Driver driver = driverRepository.findByUser_Email(email).orElseThrow(() -> new UsernameNotFoundException("Driver not found"));
            AnimalSighting saved = service.saveAnimalSighting(dto, driver);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            logger.error("Error saving sighting: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}