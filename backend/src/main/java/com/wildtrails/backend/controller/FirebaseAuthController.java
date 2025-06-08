package com.wildtrails.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.wildtrails.backend.service.FirebaseTokenService;

@RestController
@RequestMapping("/api/firebase-auth")
public class FirebaseAuthController {
     @Autowired private FirebaseTokenService firebaseTokenService;

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestHeader("Authorization") String authHeader) {
        try {
            String idToken = authHeader.replace("Bearer ", "");
            FirebaseToken token = firebaseTokenService.verifyToken(idToken);
            String email = token.getEmail();

            // Check if user exists in your DB, if not register
            // Return your own JWT or session info if needed

            return ResponseEntity.ok("Verified Firebase user: " + email);
        } catch (FirebaseAuthException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Firebase token");
        }
    }
}
