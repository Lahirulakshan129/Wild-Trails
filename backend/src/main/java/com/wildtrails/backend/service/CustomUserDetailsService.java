package com.wildtrails.backend.service;

import com.wildtrails.backend.entity.Role;
import com.wildtrails.backend.entity.User;
import com.wildtrails.backend.repository.UserRepository;
import com.wildtrails.backend.security.CustomUserDetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        return new CustomUserDetails(user);
    }
    

    public User loadOrCreateCustomer(String email, String name, int uid) {
        return userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = User.builder()
                    .email(email)
                    .name(name)
                    .id(uid)
                    .role(Role.CUSTOMER) // Assuming Role is an enum with CUSTOMER as one of the values
                    .password("defaultPassword") // Replace with a secure default or generated password
                    .build();
            return userRepository.save(newUser);
        });
    }
}
