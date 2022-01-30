package com.example.Tuesday_Bookly.controller;

import com.example.Tuesday_Bookly.security.services.SecurityService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;


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
            headers.set("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJib29rbHkiLCJleHAiOjE2NDM2MjQ4NDgsImlhdCI6MTY0MzUzODQ0OH0.CzcUyaGveO-gAEnabepX90C8XwQ-BKVqLc4hIUGK2UyFBOP7blrIhNkUyf_i6H8WtHLC-0KE6muk2QaNEfqZHQ");
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
}