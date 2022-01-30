package com.example.Tuesday_Bookly.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Image
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    private String name;

    private String type;

    private int creationTimestamp;

    private int fileSize;

    private String filepath;

    @ManyToOne
    @JoinColumn(name="carId")
    private Car car;

    @ManyToOne
    @JoinColumn(name="flatId")
    private Flat flat;

    @ManyToOne
    @JoinColumn(name="parkingSlotId")
    private ParkingSlot parkingSlot;
}
