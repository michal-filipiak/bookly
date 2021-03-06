package com.example.Tuesday_Bookly.controller;

import com.example.Tuesday_Bookly.models.Flat;
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
import java.util.List;
import java.util.Optional;


@Slf4j
@RestController
@RequestMapping(path = "/flats")
public class FlatController
{

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private SecurityService securityService;

    @Autowired
    public FlatController()
    {}

    @GetMapping(path = "")
    public ResponseEntity<List<Flat>> getFlats(@RequestHeader HttpHeaders httpHeaders, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Optional<LocalDateTime> startDate,
                                               @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)Optional<LocalDateTime> endDate,
                                               @RequestParam Optional<String> location)
    {
        if(securityService.Authenticate(httpHeaders))
        {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJib29rbHkiLCJleHAiOjE2NDM3MTY5OTcsImlhdCI6MTY0MzYzMDU5N30.oONcm_cLgH8ZfNDinPe1RkLUHJXYqpEbg7gcx5ZW0Yz-BQ1UQgd9mmfUm2s05m3OYccDVg45GIxQLMDx33Vnsg");
            HttpEntity<Void> entity = new HttpEntity<>(headers);
            UriComponentsBuilder url = UriComponentsBuilder.fromHttpUrl("https://pw-flatly.herokuapp.com/api/flats");

            //TODO: filters jak nam dadza :)

/*            Map<String, String> params = new HashMap<>();
            if(startDate.isPresent())
                url.queryParam("startDate", startDate);
            if(endDate.isPresent())
                url.queryParam("endDate", endDate);
            if(location.isPresent())
                url.queryParam("location", location);
*/

            ResponseEntity<List<Flat>> response = restTemplate.exchange(url.toUriString(), HttpMethod.GET, entity, new ParameterizedTypeReference<List<Flat>>() {});
            return response;
        }

        return new ResponseEntity<List<Flat>>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Flat> getFlat(@RequestHeader HttpHeaders httpHeaders, @PathVariable("id") long id){
        if(securityService.Authenticate(httpHeaders)){
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJib29rbHkiLCJleHAiOjE2NDM3MTY5OTcsImlhdCI6MTY0MzYzMDU5N30.oONcm_cLgH8ZfNDinPe1RkLUHJXYqpEbg7gcx5ZW0Yz-BQ1UQgd9mmfUm2s05m3OYccDVg45GIxQLMDx33Vnsg");
            HttpEntity<Void> entity = new HttpEntity<>(headers);
            String stringURL = "https://pw-flatly.herokuapp.com/api/flats/" + id;
            UriComponentsBuilder url = UriComponentsBuilder.fromHttpUrl(stringURL);

            ResponseEntity<Flat> response = restTemplate.exchange(url.toUriString(), HttpMethod.GET, entity, new ParameterizedTypeReference<Flat>() {});
            return response;
        }
        return new ResponseEntity<Flat>(HttpStatus.UNAUTHORIZED);
    }
}