package com.example.Tuesday_Bookly.models.bookings;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)

public class CarlyBookingModel
{
    public long orderId;
//    public String firstName;
//
//    public String lastName;
//
//    public LocalDateTime startDate;
//
//    public LocalDateTime endDate;
//
//    public int status;
}
