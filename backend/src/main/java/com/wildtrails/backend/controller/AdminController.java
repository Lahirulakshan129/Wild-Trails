package com.wildtrails.backend.controller;

import com.wildtrails.backend.dto.RegisterRequest;
import com.wildtrails.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AuthService authService;

    // Only users with role ADMIN can access this
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/register-driver")
    public ResponseEntity<?> registerDriver(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.registerDriver(request));
    }
}
