package com.wildtrails.backend.controller;

import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.wildtrails.backend.entity.User;
import com.wildtrails.backend.entity.Role;
import com.wildtrails.backend.repository.UserRepository;
import com.wildtrails.backend.service.FirebaseTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth/firebase")
public class FirebaseAuthController {

    @Autowired private FirebaseTokenService firebaseTokenService;
    @Autowired private UserRepository userRepository;

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestHeader("Authorization") String authHeader) {
        try {
            String idToken = authHeader.replace("Bearer ", "");
            FirebaseToken token = firebaseTokenService.verifyToken(idToken);
            String email = token.getEmail();
            String name = token.getName();

            // Check if user already exists
            Optional<User> existingUserOpt = userRepository.findByEmail(email);

            User user;
            if (existingUserOpt.isEmpty()) {
                // Register new user with CUSTOMER role
                user = new User();
                user.setEmail(email);
                user.setName(name != null ? name : "Firebase User");
                user.setRole(Role.CUSTOMER);  // default Firebase users are customers
                user = userRepository.save(user);
            } else {
                user = existingUserOpt.get();
            }

            // Return basic user info (DTO or entity — depending on security)
            return ResponseEntity.ok(user);

        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body("Invalid Firebase token");
        }
    }
}
