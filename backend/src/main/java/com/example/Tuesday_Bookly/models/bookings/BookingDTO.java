package com.example.Tuesday_Bookly.models.bookings;

import com.example.Tuesday_Bookly.enums.ItemTypeEnum.ItemType;
import com.example.Tuesday_Bookly.models.Car;
import com.example.Tuesday_Bookly.models.Flat;
import com.example.Tuesday_Bookly.models.ParkingSlot;
import com.example.Tuesday_Bookly.models.User;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
public class BookingDTO
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private long itemId;

    private ItemType itemType;

    private LocalDateTime startDateTime;

    private LocalDateTime endDateTime;

    private boolean active;

    private long externBookingId;

    @ManyToOne
    @JoinColumn(name="ownerId")
    private User owner;
}