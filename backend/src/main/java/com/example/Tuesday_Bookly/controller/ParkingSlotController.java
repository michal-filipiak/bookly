package com.example.Tuesday_Bookly.controller;

import com.example.Tuesday_Bookly.models.*;
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

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Slf4j
@RestController
@RequestMapping(path = "/slots")
public class ParkingSlotController
{

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private SecurityService securityService;

    @Autowired
    public ParkingSlotController()
    {}

    @GetMapping(path = "")
    public ResponseEntity<List<ParkingSlot>> getParkingSlot(@RequestHeader HttpHeaders httpHeaders, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Optional<LocalDateTime> startDate,
                                                      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)Optional<LocalDateTime> endDate,
                                                      @RequestParam Optional<String> location)
    {
        if(securityService.Authenticate(httpHeaders))
        {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.set("security-header", "1f7b572f-2c48-4ce7-a010-6b86112daea3");
            HttpEntity<Void> entity = new HttpEntity<>(headers);
            UriComponentsBuilder url = UriComponentsBuilder.fromHttpUrl("https://parkly-2022.azurewebsites.net/items");

            if(startDate.isPresent())
                url.queryParam("startDate", startDate.get().atZone(ZoneOffset.UTC));
            if(endDate.isPresent())
                url.queryParam("endDate", endDate.get().atZone(ZoneOffset.UTC));
            if(location.isPresent())
                url.queryParam("location", location.get());

            //get active only
            url.queryParam("filter", "active");



            ResponseEntity<List<ParkingSlot>> response = restTemplate.exchange(url.encode().toUriString(), HttpMethod.GET, entity, new ParameterizedTypeReference<List<ParkingSlot>>() {});
            return response;
        }

        return new ResponseEntity<List<ParkingSlot>>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping(path="/{id}")
    public ResponseEntity<ParkingSlot> getParkingSlot(@RequestHeader HttpHeaders httpHeaders, @PathVariable("id") long id){
        if(securityService.Authenticate(httpHeaders)){
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.set("security-header", "1f7b572f-2c48-4ce7-a010-6b86112daea3");
            HttpEntity<Void> entity = new HttpEntity<>(headers);
            String stringURL = "https://parkly-2022.azurewebsites.net/items/" + id;
            UriComponentsBuilder url = UriComponentsBuilder.fromHttpUrl(stringURL);

            ResponseEntity<ParkingSlot> response = restTemplate.exchange(url.toUriString(), HttpMethod.GET, entity, new ParameterizedTypeReference<ParkingSlot>() {});
            return response;
        }
        return  new ResponseEntity<ParkingSlot>(HttpStatus.UNAUTHORIZED);
    }



}