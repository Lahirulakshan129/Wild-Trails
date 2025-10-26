package com.wildtrails.backend.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PackageRequestDTO {
    private String packageName;
    private Double packagePrice;
    private String packageType;
    private MultipartFile imageFile; // for uploaded image
    private String details;
    private Integer maxPeople;      // safari
    private String vehicleType;     // hire
    private String tourName;        // hire
    private Integer capacity;       // hire
}
