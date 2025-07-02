package com.wildtrails.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import com.wildtrails.backend.service.AnimalSightingService;
import com.wildtrails.backend.dto.AnimalSightingDTO;
import com.wildtrails.backend.dto.AnimalSightingResponseDTO;
import com.wildtrails.backend.entity.AnimalSighting;
import com.wildtrails.backend.entity.Driver;
import com.wildtrails.backend.repository.DriverRepository;
import com.wildtrails.backend.service.WebSocketSightingNotifier;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@PreAuthorize("hasAnyRole('DRIVER','ADMIN')")
@RequestMapping("/api/sightings")
public class AnimalSightingController {

    private final AnimalSightingService service;
    private final DriverRepository driverRepository;
    private final WebSocketSightingNotifier sightingNotifier;

    public AnimalSightingController(AnimalSightingService service, 
                                  DriverRepository driverRepository,
                                  WebSocketSightingNotifier sightingNotifier) {
        this.service = service;
        this.driverRepository = driverRepository;
        this.sightingNotifier = sightingNotifier;
    }
@PostMapping("/createSighting")
public ResponseEntity<AnimalSightingResponseDTO> createSighting(
        @RequestBody AnimalSightingDTO dto,
        Authentication authentication) {

    String email = authentication.getName();
    Driver driver = driverRepository.findByUser_Email(email)
            .orElseThrow(() -> new UsernameNotFoundException("Driver not found"));

    AnimalSighting saved = service.saveAnimalSighting(dto, driver);

    AnimalSightingResponseDTO response = new AnimalSightingResponseDTO(saved);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
}
    @GetMapping("/recent")
    public ResponseEntity<List<AnimalSightingResponseDTO>> getRecentSightings() {
        LocalDateTime cutoff = LocalDateTime.now().minusMinutes(30);
        List<AnimalSighting> raw = service.getSightingsAfter(cutoff);
        List<AnimalSightingResponseDTO> response = raw.stream()
                .map(AnimalSightingResponseDTO::new)
                .toList();
        return ResponseEntity.ok(response);
    }
}