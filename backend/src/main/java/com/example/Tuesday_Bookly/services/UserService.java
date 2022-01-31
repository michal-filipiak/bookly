package com.example.Tuesday_Bookly.services;

import com.example.Tuesday_Bookly.dao.BookingRepository;
import com.example.Tuesday_Bookly.models.bookings.BookingDTO;
import lombok.extern.slf4j.Slf4j;
import com.example.Tuesday_Bookly.dao.UserRepository;
import com.example.Tuesday_Bookly.exceptions.UserValidationException;
import com.example.Tuesday_Bookly.models.User;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.awt.print.Book;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import static com.example.Tuesday_Bookly.utils.Helper.isValid;

@Slf4j
public class UserService implements UserClient
{
    @Setter
    private PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private static final SecureRandom secureRandom = new SecureRandom();
    private static final Base64.Encoder base64Encoder = Base64.getUrlEncoder();

    public String generateNewToken()
    {
        boolean exists = true;
        String token = "";
        while(exists)
        {
            byte[] randomBytes = new byte[24];
            secureRandom.nextBytes(randomBytes);
            token = base64Encoder.encodeToString(randomBytes);
            exists = userRepository.existsBySecurityToken(token);
        }

        return token;
    }

    @Autowired
    public UserService(UserRepository userRepository, BookingRepository bookingRepository)
    {
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
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
            else
            {
                log.info("Creating token for the user");
                String token = "Bearer " + generateNewToken();
                user.setSecurityToken(token);
            }
            user = userRepository.save(user);
            log.info("User was saved.");
        }
        return user;
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

    @Override
    public List<User> getUsers(Optional<String> login)
    {
        if(login.isPresent() && !login.get().equals(""))
            return userRepository.findAllByLoginContains(login.get());
        else
            return userRepository.findAll();
    }

    @Override
    public boolean deleteUser(String token, long id)
    {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent())
        {
            List<BookingDTO> bookings = bookingRepository.findAllByOwnerSecurityToken(user.get().getSecurityToken());
            if (bookings.stream().anyMatch(x -> x.isActive()))
            {
                log.info("You cannot delete a user with active bookings");
                return false;
            }
            if (userRepository.findBySecurityToken(token).get().getId() == id)
            {
                log.info("You cannot delete yourself");
                return false;
            }

            userRepository.deleteById(id);
            log.info("User with id {} deleted", id);
            return true;
        }
        return false;
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

        log.error("User is null.");
        throw new UserValidationException("User is null.");
    }

}