package com.example.Tuesday_Bookly.services;

import com.example.Tuesday_Bookly.models.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.List;
import java.util.Optional;

public interface UserClient
{
    User addUser(User user);
    User updatePassword(User user, String password);
    List<User> getUsers(Optional<String> login);
    boolean deleteUser(String token, long id);

    void setPasswordEncoder(PasswordEncoder passwordEncoder);
}