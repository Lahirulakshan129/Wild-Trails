package com.wildtrails.backend.controller;

import com.wildtrails.backend.entity.User; // Ensure this import is correct and the User class exists in the specified package
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
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        String token = authService.login(request.username(), request.password());
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        User user = authService.register(request.username(), request.password(), request.role());
        return ResponseEntity.ok(user);
    }

    // DTOs
    record AuthRequest(String username, String password) {}
    record RegisterRequest(String username, String password, String role) {}
    record AuthResponse(String token) {}
}
