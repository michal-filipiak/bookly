package com.example.Tuesday_Bookly.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.client.RestTemplate;

public class HttpService implements HttpClient {

    private final Logger logger = LoggerFactory.getLogger(HttpService.class);

    private final RestTemplate restTemplate;

    public HttpService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public Object consume(String url) {
        final Object object = restTemplate.getForObject(url, String.class);
        if (object != null) {
            logger.info("This is Quote: {}", object);
        } else {
            logger.warn("Quote is null");
        }
        return object;
    }
}
