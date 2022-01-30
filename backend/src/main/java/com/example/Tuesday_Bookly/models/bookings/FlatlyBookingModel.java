package com.example.Tuesday_Bookly.models.bookings;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)

public class FlatlyBookingModel
{
    public int flat;

    public String bookedFrom;

    public String bookedTo;
}

