package com.wildtrails.backend.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.wildtrails.backend.entity.Role;
import com.wildtrails.backend.entity.User;
import com.wildtrails.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class FirebaseAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(FirebaseAuthenticationFilter.class);
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        String requestUri = request.getRequestURI();
        logger.info("FirebaseAuthenticationFilter processing URI: {}", requestUri);

        // Normalize URI for consistent comparison
        String normalizedUri = requestUri != null ? requestUri.trim() : "";
        logger.debug("Normalized URI: {}", normalizedUri);

        // Only process Firebase endpoints
        if (!normalizedUri.startsWith("/api/auth/firebase/") && !normalizedUri.equals("/api/auth/firebase")) {
            logger.info("Skipping FirebaseAuthenticationFilter for non-Firebase URI: {}", normalizedUri); // Changed to INFO
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        logger.debug("Authorization header: {}", authHeader);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            logger.debug("No valid Bearer token found for Firebase URI: {}", normalizedUri);
            filterChain.doFilter(request, response);
            return;
        }

        String idToken = authHeader.substring(7);
        try {
            logger.debug("Processing Firebase token for URI: {}", normalizedUri);
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String email = decodedToken.getEmail();

            if (email == null || email.isEmpty()) {
                logger.warn("No email found in Firebase token for URI: {}", normalizedUri);
                filterChain.doFilter(request, response);
                return;
            }

            User user = userRepository.findByEmail(email)
                    .orElseGet(() -> {
                        User newUser = new User();
                        newUser.setEmail(email);
                        newUser.setName(decodedToken.getName() != null ? decodedToken.getName() : "Firebase User");
                        newUser.setPassword("FIREBASE_AUTH");
                        newUser.setRole(determineRole(decodedToken));
                        logger.info("Creating new user for email: {} with role: {}", email, newUser.getRole());
                        return userRepository.save(newUser);
                    });

            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    user,
                    null,
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
            );
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
            logger.info("Firebase authentication successful for email: {} with role: {}", email, user.getRole());
        } catch (Exception e) {
            logger.warn("Firebase Authentication failed for URI {}: {}", normalizedUri, e.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    private Role determineRole(FirebaseToken decodedToken) {
        Object roleClaim = decodedToken.getClaims().get("role");
        if (roleClaim != null && roleClaim.toString().equalsIgnoreCase("ADMIN")) {
            return Role.ADMIN;
        } else if (roleClaim != null && roleClaim.toString().equalsIgnoreCase("DRIVER")) {
            return Role.DRIVER;
        }
        return Role.CUSTOMER;
    }
}