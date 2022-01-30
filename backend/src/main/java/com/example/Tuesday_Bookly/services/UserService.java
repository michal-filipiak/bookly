package com.example.Tuesday_Bookly.services;

import lombok.extern.slf4j.Slf4j;
import com.example.Tuesday_Bookly.dao.UserRepository;
import com.example.Tuesday_Bookly.exceptions.UserValidationException;
import com.example.Tuesday_Bookly.models.User;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import static com.example.Tuesday_Bookly.utils.Helper.isValid;

@Slf4j
public class UserService implements UserClient
{
    @Autowired
    private final UserRepository userRepository;
    @Setter
    private PasswordEncoder passwordEncoder;
    private static final SecureRandom secureRandom = new SecureRandom(); //threadsafe
    private static final Base64.Encoder base64Encoder = Base64.getUrlEncoder(); //threadsafe

    public String generateNewToken() {
        boolean exists = true;
        String token = "";
        while(exists){
            byte[] randomBytes = new byte[24];
            secureRandom.nextBytes(randomBytes);
            token = base64Encoder.encodeToString(randomBytes);
            exists = userRepository.existsBysecurityToken(token);
        }
        return token;
    }
    public UserService(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    @Override
    public User addUser(User user)
    {
        if (isValidUser(user))
        {
            log.info("User is valid");
            Optional<User> dbUser = userRepository.findByLogin(user.getLogin());
            if (dbUser.isPresent())
            {
                log.info("User already exists. Updating it.");
                user.setId(dbUser.get().getId());
            }
            else{
                log.info("Creating token for the user");
                String token = "Bearer " + generateNewToken();
                user.setSecurityToken(token);
            }
            user = userRepository.save(user);
            log.info("User was saved.");
        }
        return user;
    }


    private boolean isValidUser(User user)
    {
        if (user != null)
        {
            if (!isValid(user.getLogin()))
            {
                log.error("Empty login.");
                throw new UserValidationException("Empty login.");
            }

            if (!isValid(user.getPassword()))
            {
                log.error("Empty user password.");
                throw new UserValidationException("Empty user password.");
            }

            if (!isValid(user.getFirstName()))
            {
                log.error("Empty first name.");
                throw new UserValidationException("Empty first name.");
            }

            if (!isValid(user.getLastName()))
            {
                log.error("Empty last name.");
                throw new UserValidationException("Empty last name.");
            }

            return true;
        }

        //log.error("User is null.");
        throw new UserValidationException("User is null.");
    }

    @Override
    public User updatePassword(User user, String password)
    {
        if (isValidUser(user))
        {
            if (passwordEncoder != null)
            {
                log.debug("Encoding password.");
                user.setPassword(passwordEncoder.encode(password));
            }
            else
            {
                log.debug("Password in plain text.");
                user.setPassword(password);
            }

            user = userRepository.save(user);
        }
        return user;
    }

    public List<User> getUsers(String login){
        if(login.equals("")){
            List<User> usersList = userRepository.findAll();
            return usersList;
        }
        else{
            return userRepository.findAllByLoginContains(login);
        }
    }

}