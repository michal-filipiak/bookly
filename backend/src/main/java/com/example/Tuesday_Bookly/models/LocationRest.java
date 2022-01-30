package com.example.Tuesday_Bookly.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LocationRest implements Serializable {

    @EqualsAndHashCode.Include
    @JsonProperty("id")
    private long locationId;

    @JsonProperty("country")
    private String country;

    @JsonProperty("city")
    private String city;

    @JsonProperty("street")
    private String street;

    @JsonProperty("number")
    private String streetNumber;

    @JsonProperty("zipcode")
    private String zipCode;

    @EqualsAndHashCode.Include
    @JsonProperty("latitude")
    private double latitude;

    @EqualsAndHashCode.Include
    @JsonProperty("longitude")
    private double longitude;
}