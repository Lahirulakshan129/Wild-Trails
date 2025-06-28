package com.wildtrails.backend.repository;

import com.wildtrails.backend.entity.SOSAlert;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SOSAlertRepository extends JpaRepository<SOSAlert, Long> {
}
