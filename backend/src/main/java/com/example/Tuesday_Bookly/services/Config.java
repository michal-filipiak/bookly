package com.example.Tuesday_Bookly.services;

import com.example.Tuesday_Bookly.dao.UserRepository;
import com.example.Tuesday_Bookly.utils.LocalDateFormatter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.util.*;

import static java.util.stream.Collectors.toSet;

@Configuration
@Slf4j
public class Config {

    @Value(value = "${cors.urls}")
    private String corsUrls;
    @Value(value = "${cors.mappings}")
    private String corsMappings;

    private static final Map<String, String> envPropertiesMap = System.getenv();

    @PostConstruct
    private void init()
    {
        log.debug("************** Environment variables **************");
        for (Map.Entry<String, String> entry : envPropertiesMap.entrySet())
            log.debug("[{}] : [{}]", entry.getKey(), entry.getValue());
    }

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder)
    {
        return builder.build();
    }

    @Bean
    public HttpClient httpClient(RestTemplate restTemplate)
    {
        return new HttpService(restTemplate);
    }

    @Bean
    public UserClient userClient(UserRepository userRepository)
    {
        return new UserService(userRepository);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer()
    {
        getCorsUrls();
        return new WebMvcConfigurer()
        {
            @Override
            public void addCorsMappings(CorsRegistry registry)
            {
                final Set<String> mappings = getCorsMappings();
                if (mappings.isEmpty())
                    registry.addMapping("/**");
                else
                    for (String mapping : mappings)
                        registry.addMapping(mapping).allowedOrigins(getCorsUrls());
            }
        };
    }

    @Bean
    @Primary
    public org.springframework.format.Formatter<LocalDate> localDateFormatter() {
        return new LocalDateFormatter();
    }


    private String[] getCorsUrls()
    {
        return Optional.ofNullable(corsUrls)
                .map(value -> value.split(","))
                .orElseGet(() -> new String[0]);
    }

    private Set<String> getCorsMappings()
    {
        return Optional.ofNullable(corsMappings)
                .map(value -> Arrays.stream(value.split(",")))
                .map(stream -> stream.collect(toSet()))
                .orElseGet(HashSet::new);
    }
}