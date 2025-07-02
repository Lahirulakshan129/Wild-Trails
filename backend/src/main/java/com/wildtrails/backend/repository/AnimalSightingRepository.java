package com.wildtrails.backend.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wildtrails.backend.entity.AnimalSighting;

@Repository
public interface AnimalSightingRepository extends JpaRepository<AnimalSighting, Long> {
    List<AnimalSighting> findByAnimalNameAndDateTimeAfter(String animalName, LocalDateTime dateTime);
    List<AnimalSighting> findByDateTimeAfter(LocalDateTime time);

}
