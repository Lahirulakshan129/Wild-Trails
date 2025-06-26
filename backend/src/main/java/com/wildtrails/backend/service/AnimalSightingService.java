package com.wildtrails.backend.service;

import com.wildtrails.backend.dto.AnimalSightingDTO;
import com.wildtrails.backend.entity.AnimalSighting;
import com.wildtrails.backend.entity.Driver;
import com.wildtrails.backend.entity.Location;
import com.wildtrails.backend.repository.AnimalSightingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.ZoneId;

@Service
public class AnimalSightingService {

    private static final Logger logger = LoggerFactory.getLogger(AnimalSightingService.class);
    private final AnimalSightingRepository repository;

    public AnimalSightingService(AnimalSightingRepository repository) {
        this.repository = repository;
    }

    public AnimalSighting saveAnimalSighting(AnimalSightingDTO dto, Driver driver) {
        logger.info("Saving sighting for driver: {}", driver.getId());
        try {
            AnimalSighting sighting = new AnimalSighting();
            sighting.setAnimalName(dto.getAnimalName());
            sighting.setNotes(dto.getNotes());

            // Parse ISO date string and convert to IST
            if (dto.getDateTime() != null) {
                ZonedDateTime utcDateTime = ZonedDateTime.parse(dto.getDateTime(), DateTimeFormatter.ISO_DATE_TIME);
                ZonedDateTime istDateTime = utcDateTime.withZoneSameInstant(ZoneId.of("Asia/Kolkata"));
                sighting.setDateTime(istDateTime.toLocalDateTime());
            }

            // Set Location object
            if (dto.getLat() != null && dto.getLng() != null) {
                Location location = new Location();
                location.setLat(dto.getLat());
                location.setLng(dto.getLng());
                sighting.setLocation(location);
            }

            sighting.setSubmittedBy(driver);
            return repository.save(sighting);
        } catch (Exception e) {
            logger.error("Error saving sighting: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to save sighting: " + e.getMessage(), e);
        }
    }
}