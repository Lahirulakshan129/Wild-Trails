package com.wildtrails.backend.service;

import com.wildtrails.backend.dto.AuthResponse;
import com.wildtrails.backend.dto.RegisterRequest;
import com.wildtrails.backend.entity.User;
import com.wildtrails.backend.repository.UserRepository;
import com.wildtrails.backend.security.JwtUtil;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository,PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public String login(String username, String password) {
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password)
        );
        return jwtUtil.generateToken(auth);
    }

    public User register(String username, String password, String role) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        User user = User.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .role(role)
                .build();

        return userRepository.save(user);
    }

    public AuthResponse registerDriver(RegisterRequest request) {
    var user = User.builder()
            .username(request.getUsername())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(Role.DRIVER)
            .build();

    userRepository.save(user);

    var jwt = jwtService.generateToken(user);

    return new AuthResponse(jwt);
}

}
