package com.example.Tuesday_Bookly.dao;

import java.util.List;
import java.util.Optional;

import com.example.Tuesday_Bookly.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>
{
    Optional<User> findByLogin(String login);
    List<User> findAllByLoginContains(String Login);
    boolean existsBySecurityToken(String token);
    Optional<User> findBySecurityToken(String token);
}