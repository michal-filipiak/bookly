package com.example.Tuesday_Bookly.controller;

import com.example.Tuesday_Bookly.models.Car;
import com.example.Tuesday_Bookly.security.services.SecurityService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.text.MessageFormat;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Slf4j
@RestController
@RequestMapping(path = "/cars")
public class CarController
{

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private SecurityService securityService;

    @Autowired
    public CarController()
    {}

    @GetMapping(path = "")
    public ResponseEntity<List<Car>> getCars(@RequestHeader HttpHeaders httpHeaders,
                                             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Optional<LocalDateTime> startDate,
                                             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)Optional<LocalDateTime> endDate,
                                             @RequestParam Optional<String> location, @RequestParam Optional<Integer> maxNum, @RequestParam Optional<String> model,
                                             @RequestParam Optional<String> carName)
    {
        if(securityService.Authenticate(httpHeaders))
        {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJib29rbHkxMjMiLCJleHAiOjE2NDM2NDcyNDcsImlhdCI6MTY0MzU2MDg0N30.dVX5tyVtmigVBTYfaYUKW3R3I6TS9_LusQOdAUvGexIM-b5jVD_YlmfdaMg2YhAZ85937kZJnVXsRGYutFdZkw");
            HttpEntity<Void> entity = new HttpEntity<>(headers);
            UriComponentsBuilder url = UriComponentsBuilder.fromHttpUrl("https://pw2021-carly-backend.azurewebsites.net/V1/cars");

            if(startDate.isPresent())
                url.queryParam("startDate", startDate);
            if(endDate.isPresent())
                url.queryParam("endDate", endDate);
            if(location.isPresent())
                url.queryParam("location", location);
            if(maxNum.isPresent())
                url.queryParam("maxNum", maxNum);
            if(model.isPresent())
                url.queryParam("model", model);
            if(carName.isPresent())
                url.queryParam("model", carName);

            ResponseEntity<List<Car>> response = restTemplate.exchange(url.encode().toUriString(), HttpMethod.GET, entity, new ParameterizedTypeReference<List<Car>>() {});
            return response;
        }

        return new ResponseEntity<List<Car>>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Car> getCar(@RequestHeader HttpHeaders httpHeaders, @PathVariable("id") long id)
    {
        if (securityService.Authenticate(httpHeaders))
        {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJib29rbHkxMjMiLCJleHAiOjE2NDM2NDcyNDcsImlhdCI6MTY0MzU2MDg0N30.dVX5tyVtmigVBTYfaYUKW3R3I6TS9_LusQOdAUvGexIM-b5jVD_YlmfdaMg2YhAZ85937kZJnVXsRGYutFdZkw");
            HttpEntity<Void> entity = new HttpEntity<>(headers);
            UriComponentsBuilder url = UriComponentsBuilder.fromHttpUrl(MessageFormat.format("https://pw2021-carly-backend.azurewebsites.net/V1/cars/{0}",id));

            ResponseEntity<Car> response = restTemplate.exchange(url.encode().toUriString(), HttpMethod.GET, entity, Car.class);
            return response;
        }

        return new ResponseEntity<Car>(HttpStatus.UNAUTHORIZED);
    }
}