package com.example.Tuesday_Bookly.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ParkingSlot
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private boolean isActive;

    private String description;

    private double height;

    private double width;

    private LocationRest location;

    private double cost;

//    @OneToMany(mappedBy="parkingSlot", fetch=FetchType.LAZY)
//    private List<Image> images;
}