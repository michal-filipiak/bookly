package com.example.Tuesday_Bookly.controller;

import com.example.Tuesday_Bookly.models.User;
import com.example.Tuesday_Bookly.security.models.UserLoginModel;
import com.example.Tuesday_Bookly.security.services.SecurityService;
import com.example.Tuesday_Bookly.services.UserClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Optional;


@Slf4j
@RestController
@RequestMapping(path = "/users")
public class UserController
{
    protected final UserClient userClient;
    private final PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private SecurityService securityService;

    @Autowired
    public UserController(UserClient userClient, PasswordEncoder passwordEncoder,
                          SecurityService securityService, AuthenticationManager authenticationManager)
    {
        this.userClient = userClient;
        this.passwordEncoder = passwordEncoder;
        this.securityService = securityService;
        this.authenticationManager = authenticationManager;
    }

    @PostConstruct
    private void init()
    {
        userClient.setPasswordEncoder(passwordEncoder);
    }


    @PostMapping(path = "/login")
    public ResponseEntity<String> login(@RequestBody UserLoginModel userLoginModel) throws Exception
    {
        authenticate(userLoginModel.getLogin(), userLoginModel.getPassword());
        final User user = securityService.loadUserByUsername(userLoginModel.getLogin());
        final String token = user.getSecurityToken();
        return ResponseEntity.ok(token);
    }

    @PostMapping(path = "/add")
    public ResponseEntity<User> createUser(@RequestBody User user)
    {
        user = userClient.addUser(user);
        log.info("Saving user.");
        userClient.updatePassword(user, user.getPassword());
        log.info("Encoding password;");
        return ResponseEntity.ok(user);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> deleteUser(@RequestHeader HttpHeaders headers, @PathVariable("id") long id)
    {
        if(securityService.Authenticate(headers))
        {
            return userClient.deleteUser(headers.getFirst("Authorization"), id)
                    ? ResponseEntity.ok("User deleted")
                    : ResponseEntity.badRequest().body("You cannot delete this user");
        }

        return new ResponseEntity<String>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping(path = "")
    public ResponseEntity<List<User>> getUsers(@RequestHeader HttpHeaders headers, @RequestParam Optional<String> login)
    {
        if(securityService.Authenticate(headers))
        {
            List<User> usersList = userClient.getUsers(login);
            return ResponseEntity.ok(usersList);
        }

        return new ResponseEntity<List<User>>(HttpStatus.UNAUTHORIZED);
    }

    private void authenticate(String username, String password) throws Exception
    {
        try
        {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        }
        catch (DisabledException e)
        {
            throw new Exception("USER_DISABLED", e);
        }
        catch (BadCredentialsException e)
        {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

}