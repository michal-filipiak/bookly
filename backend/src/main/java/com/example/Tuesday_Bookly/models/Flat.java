package com.example.Tuesday_Bookly.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Flat
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    private Timestamp creationTimestamp;

    private Timestamp modifiedTimestamp;

    private int floorSpace;

    private int rooms;

    private int maxGuests;

    private boolean active;

    private String location;

    private int price;

//    @OneToMany(mappedBy="flat", fetch=FetchType.LAZY)
//    private List<Image> images;


}