package com.wildtrails.backend.repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.wildtrails.backend.entity.Driver; 
import com.wildtrails.backend.entity.User;

public interface DriverRepository extends JpaRepository<Driver, Long> {
    Optional<Driver> findByUser(User user);
    
    Optional<Driver> findByUser_Email(String email);

}
