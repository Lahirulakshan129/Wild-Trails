package com.wildtrails.backend.dto;
import com.wildtrails.backend.entity.Role;

public class RegisterRequest {
    public String email;
    public String password;
    public Role role;
}