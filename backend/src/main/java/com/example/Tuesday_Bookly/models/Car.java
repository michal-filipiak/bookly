package com.example.Tuesday_Bookly.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import lombok.Data;
import javax.persistence.*;
import java.awt.image.BufferedImage;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Car
{
    private long carId;

    private String carName;

    private String carModel;

    private LocalDateTime startDateTime;

    private LocalDateTime endDateTime;

    private boolean active;

    private BigDecimal price;

    private String location;

    private String description;

    private List<String> images;
}