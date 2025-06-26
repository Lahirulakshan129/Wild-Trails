package com.wildtrails.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wildtrails.backend.entity.AnimalSighting;

@Repository
public interface AnimalSightingRepository extends JpaRepository<AnimalSighting, Long> {
}
