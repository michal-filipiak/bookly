package com.example.Tuesday_Bookly.security.services;

import com.example.Tuesday_Bookly.dao.UserRepository;
import com.example.Tuesday_Bookly.models.User;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SecurityService implements UserDetailsService {

    private final UserRepository userRepository;

    public SecurityService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean Authenticate(HttpHeaders headers)
    {
        String token = headers.getFirst("Authorization");
        return userRepository.existsBysecurityToken(token);
    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException
    {
        Optional<User> user = userRepository.findByLogin(username);
        if (user.isPresent())
            return user.get();
        else
            throw new UsernameNotFoundException("User with login: " + username + "was not found.");
    }
}
