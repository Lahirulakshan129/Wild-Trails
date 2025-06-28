package com.wildtrails.backend.service;

import com.wildtrails.backend.dto.SOSAlertDTO;
import com.wildtrails.backend.entity.Driver;
import com.wildtrails.backend.entity.SOSAlert;
import com.wildtrails.backend.repository.SOSAlertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class SOSAlertService {
    private final SOSAlertRepository sosAlertRepository;

    public SOSAlert saveAlert(SOSAlertDTO dto, Driver driver) {
        SOSAlert alert = SOSAlert.builder()
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .timestamp(LocalDateTime.now())
                .driver(driver)
                .build();

        return sosAlertRepository.save(alert);
    }
}
