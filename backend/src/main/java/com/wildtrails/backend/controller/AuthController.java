package com.wildtrails.backend.controller;

import com.wildtrails.backend.dto.LoginRequest;
import com.wildtrails.backend.dto.RegisterRequest;
import com.wildtrails.backend.dto.AuthResponse;
import com.wildtrails.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        String token = authService.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/register/driver")
    public ResponseEntity<AuthResponse> registerDriver(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.registerDriver(request));
    }

    @PostMapping("/register/admin")
    public ResponseEntity<AuthResponse> registerAdmin(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.registerAdmin(request));
    }
}

