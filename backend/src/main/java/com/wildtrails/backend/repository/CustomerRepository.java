package com.wildtrails.backend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.wildtrails.backend.entity.Customer;
import com.wildtrails.backend.entity.User;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByUser(User user);
}